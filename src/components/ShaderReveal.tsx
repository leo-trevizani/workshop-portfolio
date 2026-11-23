import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface ShaderRevealProps {
  frontImage: string;
  backImage: string;
  alt?: string;
  mouseForce?: number;
  cursorSize?: number;
  resolution?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  revealStrength?: number;
  revealSoftness?: number;
  style?: CSSProperties;
  className?: string;
}

const VERT_SRC = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const SPLAT_SRC = `#version 300 es
precision highp float;
uniform sampler2D uTarget;
uniform vec2 uPoint;
uniform vec2 uPrevPoint;
uniform vec3 uValue;
uniform float uRadius;
uniform float uAspect;
uniform float uAddClamp;
in vec2 vUv;
out vec4 fragColor;

float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float lenSq = dot(ab, ab);
  if (lenSq < 1e-7) return length(p - a);
  float t = clamp(dot(p - a, ab) / lenSq, 0.0, 1.0);
  return length(p - (a + t * ab));
}

void main() {
  vec4 base = texture(uTarget, vUv);
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  vec2 a = vec2(uPrevPoint.x * uAspect, uPrevPoint.y);
  vec2 b = vec2(uPoint.x * uAspect, uPoint.y);
  float d = distToSegment(p, a, b);
  float falloff = exp(-(d * d) / max(uRadius * uRadius, 1e-6));
  vec3 updated = base.rgb + uValue * falloff;
  if (uAddClamp > 0.5) {
    updated = clamp(updated, 0.0, 1.0);
  }
  fragColor = vec4(updated, 1.0);
}
`;

const ADVECTION_SRC = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;
uniform float uIsBounce;
uniform float uUseBFECC;
in vec2 vUv;
out vec4 fragColor;

vec2 sampleVelocity(vec2 uv) {
  vec2 clamped = clamp(uv, uTexelSize * 0.5, 1.0 - uTexelSize * 0.5);
  vec2 v = texture(uVelocity, clamped).xy;
  if (uIsBounce > 0.5) {
    if (uv.x < 0.0 || uv.x > 1.0) v.x *= -1.0;
    if (uv.y < 0.0 || uv.y > 1.0) v.y *= -1.0;
  }
  return v;
}

void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 backUv = vUv - uDt * vel;

  if (uUseBFECC > 0.5) {
    vec2 fwdVel = sampleVelocity(backUv);
    vec2 fwdUv = backUv + uDt * fwdVel;
    vec2 err = (vUv - fwdUv) * 0.5;
    vec2 correctedUv = clamp(backUv + err, vec2(0.0), vec2(1.0));
    vec4 res = texture(uSource, correctedUv);
    fragColor = res * uDissipation;
  } else {
    vec4 res = texture(uSource, clamp(backUv, vec2(0.0), vec2(1.0)));
    fragColor = res * uDissipation;
  }
}
`;

const VISCOUS_SRC = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uVelocityNew;
uniform vec2 uTexelSize;
uniform float uAlpha;
uniform float uBeta;
in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 l = texture(uVelocityNew, vUv - vec2(uTexelSize.x, 0.0)).xy;
  vec2 r = texture(uVelocityNew, vUv + vec2(uTexelSize.x, 0.0)).xy;
  vec2 b = texture(uVelocityNew, vUv - vec2(0.0, uTexelSize.y)).xy;
  vec2 t = texture(uVelocityNew, vUv + vec2(0.0, uTexelSize.y)).xy;
  vec2 c = texture(uVelocity, vUv).xy;
  vec2 res = (l + r + b + t + uAlpha * c) / uBeta;
  fragColor = vec4(res, 0.0, 1.0);
}
`;

const DIVERGENCE_SRC = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
in vec2 vUv;
out vec4 fragColor;

void main() {
  float L = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
  float T = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
  float div = 0.5 * ((R - L) + (T - B));
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

const POISSON_SRC = `#version 300 es
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexelSize;
in vec2 vUv;
out vec4 fragColor;

void main() {
  float L = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float div = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - div) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

const GRADIENT_SUB_SRC = `#version 300 es
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
in vec2 vUv;
out vec4 fragColor;

void main() {
  float L = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  vec2 vel = texture(uVelocity, vUv).xy;
  vel -= vec2(R - L, T - B) * 0.5;
  fragColor = vec4(vel, 0.0, 1.0);
}
`;

const COMPOSITE_SRC = `#version 300 es
precision highp float;
uniform sampler2D uFrontTex;
uniform sampler2D uBackTex;
uniform sampler2D uVelocity;
uniform sampler2D uMask;
uniform vec2 uCanvasRes;
uniform vec2 uFrontRes;
uniform vec2 uBackRes;
uniform float uRevealSoftness;
in vec2 vUv;
out vec4 fragColor;

vec2 coverUv(vec2 uv, vec2 texRes, vec2 viewRes) {
  float texAspect = texRes.x / max(texRes.y, 1.0);
  float viewAspect = viewRes.x / max(viewRes.y, 1.0);
  vec2 scale = vec2(1.0);
  if (viewAspect > texAspect) {
    scale.y = texAspect / viewAspect;
  } else {
    scale.x = viewAspect / texAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  float rawMask = texture(uMask, vUv).r;
  float softness = clamp(uRevealSoftness, 0.04, 0.65);
  float mask = smoothstep(0.10, 0.10 + softness, rawMask);

  vec2 frontUv = coverUv(vUv, uFrontRes, uCanvasRes);
  vec2 backUv = coverUv(vUv, uBackRes, uCanvasRes);

  // Subtle liquid ripple at the frontier while keeping revealed pixels sharp
  vec2 ripple = vel * 0.018 * (1.0 - mask);
  vec3 frontCol = texture(uFrontTex, clamp(frontUv + ripple, 0.0, 1.0)).rgb;
  vec3 backCol = texture(uBackTex, clamp(backUv + ripple * 0.25, 0.0, 1.0)).rgb;

  // Delicate emerald meniscus sheen along the liquid transition rim
  float edge = mask * (1.0 - mask) * 4.0;
  vec3 meniscusColor = vec3(0.204, 0.659, 0.325);
  vec3 combined = mix(frontCol, backCol, mask);
  combined += meniscusColor * edge * 0.18;

  fragColor = vec4(combined, 1.0);
}
`;

interface FboPair {
  read: { fbo: WebGLFramebuffer; tex: WebGLTexture };
  write: { fbo: WebGLFramebuffer; tex: WebGLTexture };
  swap: () => void;
  width: number;
  height: number;
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  const prog = gl.createProgram();
  if (!prog) throw new Error('Failed to create program');
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(`Program link error: ${info}`);
  }
  return prog;
}

function createRenderTarget(gl: WebGL2RenderingContext, width: number, height: number) {
  const tex = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!tex || !fbo) throw new Error('Failed to create FBO');
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteTexture(tex);
    gl.deleteFramebuffer(fbo);
    throw new Error(`Incomplete framebuffer: ${status}`);
  }
  return { fbo, tex };
}

function createDoubleFbo(gl: WebGL2RenderingContext, width: number, height: number): FboPair {
  let read = createRenderTarget(gl, width, height);
  let write = createRenderTarget(gl, width, height);
  return {
    get read() {
      return read;
    },
    get write() {
      return write;
    },
    swap() {
      const tmp = read;
      read = write;
      write = tmp;
    },
    width,
    height,
  };
}

function uploadImageTexture(
  gl: WebGL2RenderingContext,
  img: HTMLImageElement,
): WebGLTexture | null {
  const tex = gl.createTexture();
  if (!tex) return null;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  return tex;
}

export function ShaderReveal({
  frontImage,
  backImage,
  alt = 'Ilustração interativa com revelação líquida por cursor',
  mouseForce = 50,
  cursorSize = 250,
  resolution = 0.5,
  isViscous = true,
  viscous = 30,
  iterationsViscous = 16,
  iterationsPoisson = 16,
  dt = 0.016,
  BFECC = true,
  isBounce = false,
  autoDemo = false,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  revealStrength = 1.0,
  revealSoftness = 0.32,
  style,
  className = '',
}: ShaderRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    let rafId = 0;
    let teardown: (() => void) | undefined;

    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
      });

    Promise.all([loadImg(frontImage), loadImg(backImage)])
      .then(([frontImg, backImg]) => {
        if (cancelled) return;

        // Reduced motion mode: simple 2D fade crossfade on hover/touch
        if (prefersReducedMotion) {
          setReady(false);
          return;
        }

        const gl = canvas.getContext('webgl2', {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: 'high-performance',
        });

        let useWebGL = false;
        if (gl) {
          const floatColorExt = gl.getExtension('EXT_color_buffer_float');
          if (floatColorExt) {
            useWebGL = true;
          }
        }

        if (gl && useWebGL) {
          try {
            const programs = {
              splat: createProgram(gl, VERT_SRC, SPLAT_SRC),
              advect: createProgram(gl, VERT_SRC, ADVECTION_SRC),
              viscous: createProgram(gl, VERT_SRC, VISCOUS_SRC),
              divergence: createProgram(gl, VERT_SRC, DIVERGENCE_SRC),
              poisson: createProgram(gl, VERT_SRC, POISSON_SRC),
              gradSub: createProgram(gl, VERT_SRC, GRADIENT_SUB_SRC),
              composite: createProgram(gl, VERT_SRC, COMPOSITE_SRC),
            };

            const vao = gl.createVertexArray();
            const vbo = gl.createBuffer();
            gl.bindVertexArray(vao);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
              gl.STATIC_DRAW,
            );
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

            const frontTex = uploadImageTexture(gl, frontImg);
            const backTex = uploadImageTexture(gl, backImg);
            if (!frontTex || !backTex) throw new Error('Failed texture upload');

            let velocity: FboPair;
            let mask: FboPair;
            let pressure: FboPair;
            let divergence: { fbo: WebGLFramebuffer; tex: WebGLTexture };

            const initSize = () => {
              const rect = container.getBoundingClientRect();
              const dpr = Math.min(window.devicePixelRatio || 1, 2);
              const cw = Math.max(2, Math.round(rect.width * dpr));
              const ch = Math.max(2, Math.round(rect.height * dpr));
              canvas.width = cw;
              canvas.height = ch;

              const simW = Math.max(64, Math.round(rect.width * resolution));
              const simH = Math.max(64, Math.round(rect.height * resolution));

              velocity = createDoubleFbo(gl, simW, simH);
              mask = createDoubleFbo(gl, simW, simH);
              pressure = createDoubleFbo(gl, simW, simH);
              divergence = createRenderTarget(gl, simW, simH);
            };

            initSize();

            const pointer = {
              x: 0.5,
              y: 0.5,
              prevX: 0.5,
              prevY: 0.5,
              dx: 0,
              dy: 0,
              active: false,
              lastInteract: 0,
            };

            const updatePointer = (clientX: number, clientY: number, isMove = true) => {
              const rect = container.getBoundingClientRect();
              if (rect.width <= 0 || rect.height <= 0) return;
              const nx = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
              const ny = Math.min(1, Math.max(0, 1 - (clientY - rect.top) / rect.height));
              if (!pointer.active || !isMove) {
                pointer.prevX = nx;
                pointer.prevY = ny;
              } else {
                pointer.prevX = pointer.x;
                pointer.prevY = pointer.y;
              }
              pointer.x = nx;
              pointer.y = ny;
              pointer.dx = pointer.x - pointer.prevX;
              pointer.dy = pointer.y - pointer.prevY;
              pointer.active = true;
              pointer.lastInteract = performance.now();
            };

            const onPointerEnter = (e: PointerEvent) => updatePointer(e.clientX, e.clientY, false);
            const onPointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY, true);
            const onPointerDown = (e: PointerEvent) => updatePointer(e.clientX, e.clientY, false);
            const onPointerLeave = () => {
              pointer.active = false;
              pointer.dx = 0;
              pointer.dy = 0;
            };

            container.addEventListener('pointerenter', onPointerEnter);
            container.addEventListener('pointermove', onPointerMove);
            container.addEventListener('pointerdown', onPointerDown);
            container.addEventListener('pointerleave', onPointerLeave);

            const resizeObserver = new ResizeObserver(() => {
              if (cancelled) return;
              try {
                initSize();
              } catch {
                // ignore transient zero-size layout states
              }
            });
            resizeObserver.observe(container);

            setReady(true);

            const drawQuad = (target: WebGLFramebuffer | null, w: number, h: number) => {
              gl.bindFramebuffer(gl.FRAMEBUFFER, target);
              gl.viewport(0, 0, w, h);
              gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            };

            let prevAutoX = 0.5;
            let prevAutoY = 0.5;
            const startTime = performance.now();

            const renderFrame = (now: number) => {
              if (cancelled) return;

              const simW = velocity.width;
              const simH = velocity.height;
              const texelX = 1 / simW;
              const texelY = 1 / simH;
              const aspect = canvas.width / Math.max(canvas.height, 1);
              const radiusUv = Math.max(0.055, (cursorSize * 0.25) / Math.max(container.clientWidth, 320));

              gl.bindVertexArray(vao);

              // Handle pointer impulse or optional autoDemo
              let hasImpulse = false;
              let splatX = pointer.x;
              let splatY = pointer.y;
              let prevSplatX = pointer.prevX;
              let prevSplatY = pointer.prevY;
              let forceX = 0;
              let forceY = 0;
              let maskInject = 0;

              if (pointer.active) {
                const speed = Math.hypot(pointer.dx, pointer.dy);
                const hoverPresence = 0.24;
                forceX = pointer.dx * mouseForce * 0.42;
                forceY = pointer.dy * mouseForce * 0.42;
                maskInject = Math.min(1, (hoverPresence + speed * 14) * revealStrength * 0.42);
                hasImpulse = true;
                pointer.prevX = pointer.x;
                pointer.prevY = pointer.y;
                pointer.dx *= 0.4;
                pointer.dy *= 0.4;
              } else if (autoDemo && now - pointer.lastInteract > autoResumeDelay) {
                const elapsed = (now - startTime) * 0.001 * autoSpeed;
                const ramp = Math.min(1, (now - pointer.lastInteract - autoResumeDelay) / (autoRampDuration * 1000));
                const ax = 0.5 + 0.28 * Math.cos(elapsed * 1.3);
                const ay = 0.5 + 0.24 * Math.sin(elapsed * 2.1);
                prevSplatX = prevAutoX;
                prevSplatY = prevAutoY;
                splatX = ax;
                splatY = ay;
                forceX = (ax - prevAutoX) * mouseForce * 0.3 * autoIntensity * ramp;
                forceY = (ay - prevAutoY) * mouseForce * 0.3 * autoIntensity * ramp;
                maskInject = 0.25 * revealStrength * ramp;
                prevAutoX = ax;
                prevAutoY = ay;
                hasImpulse = true;
              } else if (takeoverDuration > 0 && pointer.active) {
                prevAutoX = pointer.x;
                prevAutoY = pointer.y;
              }

              if (hasImpulse) {
                // Velocity splat
                gl.useProgram(programs.splat);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
                gl.uniform1i(gl.getUniformLocation(programs.splat, 'uTarget'), 0);
                gl.uniform2f(gl.getUniformLocation(programs.splat, 'uPoint'), splatX, splatY);
                gl.uniform2f(gl.getUniformLocation(programs.splat, 'uPrevPoint'), prevSplatX, prevSplatY);
                gl.uniform3f(gl.getUniformLocation(programs.splat, 'uValue'), forceX, forceY, 0);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uRadius'), radiusUv);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uAspect'), aspect);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uAddClamp'), 0.0);
                drawQuad(velocity.write.fbo, simW, simH);
                velocity.swap();

                // Mask / dye splat
                gl.bindTexture(gl.TEXTURE_2D, mask.read.tex);
                gl.uniform1i(gl.getUniformLocation(programs.splat, 'uTarget'), 0);
                gl.uniform3f(gl.getUniformLocation(programs.splat, 'uValue'), maskInject, 0, 0);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uRadius'), radiusUv * 1.1);
                gl.uniform1f(gl.getUniformLocation(programs.splat, 'uAddClamp'), 1.0);
                drawQuad(mask.write.fbo, simW, simH);
                mask.swap();
              }

              // Advect velocity
              gl.useProgram(programs.advect);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.uniform1i(gl.getUniformLocation(programs.advect, 'uVelocity'), 0);
              gl.uniform1i(gl.getUniformLocation(programs.advect, 'uSource'), 1);
              gl.uniform2f(gl.getUniformLocation(programs.advect, 'uTexelSize'), texelX, texelY);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uDt'), dt);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uDissipation'), 0.965);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uIsBounce'), isBounce ? 1 : 0);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uUseBFECC'), BFECC ? 1 : 0);
              drawQuad(velocity.write.fbo, simW, simH);
              velocity.swap();

              // Viscous diffusion
              if (isViscous) {
                gl.useProgram(programs.viscous);
                const alpha = (texelX * texelX) / (Math.max(viscous, 0.1) * dt * 0.002 + 1e-5);
                const beta = 4 + alpha;
                gl.uniform2f(gl.getUniformLocation(programs.viscous, 'uTexelSize'), texelX, texelY);
                gl.uniform1f(gl.getUniformLocation(programs.viscous, 'uAlpha'), alpha);
                gl.uniform1f(gl.getUniformLocation(programs.viscous, 'uBeta'), beta);
                for (let i = 0; i < Math.min(iterationsViscous, 24); i++) {
                  gl.activeTexture(gl.TEXTURE0);
                  gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
                  gl.activeTexture(gl.TEXTURE1);
                  gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
                  gl.uniform1i(gl.getUniformLocation(programs.viscous, 'uVelocity'), 0);
                  gl.uniform1i(gl.getUniformLocation(programs.viscous, 'uVelocityNew'), 1);
                  drawQuad(velocity.write.fbo, simW, simH);
                  velocity.swap();
                }
              }

              // Divergence
              gl.useProgram(programs.divergence);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.uniform1i(gl.getUniformLocation(programs.divergence, 'uVelocity'), 0);
              gl.uniform2f(gl.getUniformLocation(programs.divergence, 'uTexelSize'), texelX, texelY);
              drawQuad(divergence.fbo, simW, simH);

              // Pressure solve
              gl.useProgram(programs.poisson);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
              gl.uniform1i(gl.getUniformLocation(programs.poisson, 'uDivergence'), 1);
              gl.uniform2f(gl.getUniformLocation(programs.poisson, 'uTexelSize'), texelX, texelY);
              for (let i = 0; i < Math.min(iterationsPoisson, 24); i++) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
                gl.uniform1i(gl.getUniformLocation(programs.poisson, 'uPressure'), 0);
                drawQuad(pressure.write.fbo, simW, simH);
                pressure.swap();
              }

              // Gradient subtraction
              gl.useProgram(programs.gradSub);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.uniform1i(gl.getUniformLocation(programs.gradSub, 'uPressure'), 0);
              gl.uniform1i(gl.getUniformLocation(programs.gradSub, 'uVelocity'), 1);
              gl.uniform2f(gl.getUniformLocation(programs.gradSub, 'uTexelSize'), texelX, texelY);
              drawQuad(velocity.write.fbo, simW, simH);
              velocity.swap();

              // Advect & fade reveal mask
              gl.useProgram(programs.advect);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, mask.read.tex);
              gl.uniform1i(gl.getUniformLocation(programs.advect, 'uVelocity'), 0);
              gl.uniform1i(gl.getUniformLocation(programs.advect, 'uSource'), 1);
              gl.uniform2f(gl.getUniformLocation(programs.advect, 'uTexelSize'), texelX, texelY);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uDt'), dt * 1.25);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uDissipation'), 0.982);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uIsBounce'), 0);
              gl.uniform1f(gl.getUniformLocation(programs.advect, 'uUseBFECC'), BFECC ? 1 : 0);
              drawQuad(mask.write.fbo, simW, simH);
              mask.swap();

              // Final composite
              gl.useProgram(programs.composite);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, frontTex);
              gl.activeTexture(gl.TEXTURE1);
              gl.bindTexture(gl.TEXTURE_2D, backTex);
              gl.activeTexture(gl.TEXTURE2);
              gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
              gl.activeTexture(gl.TEXTURE3);
              gl.bindTexture(gl.TEXTURE_2D, mask.read.tex);

              gl.uniform1i(gl.getUniformLocation(programs.composite, 'uFrontTex'), 0);
              gl.uniform1i(gl.getUniformLocation(programs.composite, 'uBackTex'), 1);
              gl.uniform1i(gl.getUniformLocation(programs.composite, 'uVelocity'), 2);
              gl.uniform1i(gl.getUniformLocation(programs.composite, 'uMask'), 3);
              gl.uniform2f(gl.getUniformLocation(programs.composite, 'uCanvasRes'), canvas.width, canvas.height);
              gl.uniform2f(gl.getUniformLocation(programs.composite, 'uFrontRes'), frontImg.naturalWidth, frontImg.naturalHeight);
              gl.uniform2f(gl.getUniformLocation(programs.composite, 'uBackRes'), backImg.naturalWidth, backImg.naturalHeight);
              gl.uniform1f(gl.getUniformLocation(programs.composite, 'uRevealSoftness'), revealSoftness);

              drawQuad(null, canvas.width, canvas.height);

              rafId = requestAnimationFrame(renderFrame);
            };

            rafId = requestAnimationFrame(renderFrame);

            teardown = () => {
              container.removeEventListener('pointerenter', onPointerEnter);
              container.removeEventListener('pointermove', onPointerMove);
              container.removeEventListener('pointerdown', onPointerDown);
              container.removeEventListener('pointerleave', onPointerLeave);
              resizeObserver.disconnect();
            };
          } catch {
            useWebGL = false;
          }
        }

        // 2D Canvas fluid trail fallback if float WebGL FBOs are unsupported
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;

        const trail: Array<{ x: number; y: number; vx: number; vy: number; life: number; r: number }> = [];
        let lastX = 0;
        let lastY = 0;
        let active2d = false;

        const syncSize = () => {
          const rect = container.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.max(2, Math.round(rect.width * dpr));
          canvas.height = Math.max(2, Math.round(rect.height * dpr));
          maskCanvas.width = canvas.width;
          maskCanvas.height = canvas.height;
        };
        syncSize();

        const pushPoint = (clientX: number, clientY: number, isMove: boolean) => {
          const rect = container.getBoundingClientRect();
          const dpr = canvas.width / Math.max(rect.width, 1);
          const x = (clientX - rect.left) * dpr;
          const y = (clientY - rect.top) * dpr;
          const vx = isMove && active2d ? (x - lastX) * 0.2 : 0;
          const vy = isMove && active2d ? (y - lastY) * 0.2 : 0;
          lastX = x;
          lastY = y;
          active2d = true;
          trail.push({
            x,
            y,
            vx,
            vy,
            life: 1,
            r: Math.max(40, (cursorSize * 0.28) * dpr),
          });
        };

        const onMove2d = (e: PointerEvent) => pushPoint(e.clientX, e.clientY, true);
        const onEnter2d = (e: PointerEvent) => pushPoint(e.clientX, e.clientY, false);
        const onLeave2d = () => {
          active2d = false;
        };

        container.addEventListener('pointermove', onMove2d);
        container.addEventListener('pointerenter', onEnter2d);
        container.addEventListener('pointerleave', onLeave2d);

        const ro2d = new ResizeObserver(syncSize);
        ro2d.observe(container);
        setReady(true);

        const drawCover = (targetCtx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
          const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
          const dw = img.naturalWidth * scale;
          const dh = img.naturalHeight * scale;
          targetCtx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        };

        const loop2d = () => {
          if (cancelled) return;
          const w = canvas.width;
          const h = canvas.height;

          ctx.clearRect(0, 0, w, h);
          drawCover(ctx, frontImg, w, h);

          if (trail.length > 0) {
            maskCtx.clearRect(0, 0, w, h);
            maskCtx.save();
            maskCtx.globalCompositeOperation = 'source-over';
            for (let i = trail.length - 1; i >= 0; i--) {
              const p = trail[i];
              p.x += p.vx;
              p.y += p.vy;
              p.vx *= 0.94;
              p.vy *= 0.94;
              p.life -= 0.018;
              if (p.life <= 0) {
                trail.splice(i, 1);
                continue;
              }
              const grad = maskCtx.createRadialGradient(p.x, p.y, p.r * 0.15, p.x, p.y, p.r * (1.2 - p.life * 0.2));
              grad.addColorStop(0, `rgba(255,255,255,${Math.min(1, p.life * 1.2)})`);
              grad.addColorStop(0.65, `rgba(255,255,255,${p.life * 0.7})`);
              grad.addColorStop(1, 'rgba(255,255,255,0)');
              maskCtx.fillStyle = grad;
              maskCtx.beginPath();
              maskCtx.arc(p.x, p.y, p.r * 1.2, 0, Math.PI * 2);
              maskCtx.fill();
            }
            maskCtx.globalCompositeOperation = 'source-in';
            drawCover(maskCtx, backImg, w, h);
            maskCtx.restore();

            ctx.drawImage(maskCanvas, 0, 0);
          }

          rafId = requestAnimationFrame(loop2d);
        };

        rafId = requestAnimationFrame(loop2d);

        teardown = () => {
          container.removeEventListener('pointermove', onMove2d);
          container.removeEventListener('pointerenter', onEnter2d);
          container.removeEventListener('pointerleave', onLeave2d);
          ro2d.disconnect();
        };
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      teardown?.();
    };
  }, [
    frontImage,
    backImage,
    mouseForce,
    cursorSize,
    resolution,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
    revealStrength,
    revealSoftness,
  ]);

  return (
    <div
      ref={containerRef}
      style={style}
      className={`relative select-none overflow-hidden touch-none cursor-crosshair ${className}`}
      aria-label={alt}
    >
      <img
        src={frontImage}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover block"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full block transition-opacity duration-300 ${
          ready ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
}
