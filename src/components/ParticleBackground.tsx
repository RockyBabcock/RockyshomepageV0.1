import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import type { Points as PointsType } from 'three';
import { isWebGLAvailable } from '../utils';

interface ParticleBackgroundProps {
  scrollY?: number;
}

/**
 * StarBackground - Strictly from sanidhyy/space-portfolio
 * Uses Three.js PointMaterial + Points + maath/random inSphere
 */
export const StarBackground: React.FC = (props) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 }) as Float32Array
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

/**
 * Fallback 2D Canvas Starfield
 * Faithfully replicates the exact sanidhyy/space-portfolio rotational math & starfield
 * when WebGL is disabled in the browser environment.
 */
const StarBackground2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Exact same inSphere algorithm from maath/random with 3000 points
    const pointCount = 3000;
    const positions = random.inSphere(new Float32Array(pointCount * 3), {
      radius: 1.2,
    }) as Float32Array;

    let rotX = 0;
    let rotY = 0;
    let lastTime = performance.now();
    const SQRT2_2 = Math.SQRT1_2; // cos(PI/4) = sin(PI/4)

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      rotX -= delta / 10;
      rotY -= delta / 15;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const fovScale = Math.min(width, height) * 0.75;

      for (let i = 0; i < positions.length; i += 3) {
        const x0 = positions[i];
        const y0 = positions[i + 1];
        const z0 = positions[i + 2];

        // 1. Rotate around Z by PI/4 (group rotation)
        const x1 = (x0 - y0) * SQRT2_2;
        const y1 = (x0 + y0) * SQRT2_2;
        const z1 = z0;

        // 2. Rotate around X by rotX
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // 3. Rotate around Y by rotY
        const x3 = x2 * cosY + z2 * sinY;
        const y3 = y2;
        const z3 = -x2 * sinY + z2 * cosY;

        // 4. Perspective projection with camera at [0, 0, 1]
        const dist = 1.0 - z3;
        if (dist <= 0.1) continue;

        const factor = fovScale / dist;
        const px = cx + x3 * factor;
        const py = cy - y3 * factor;

        if (px < 0 || px >= width || py < 0 || py >= height) continue;

        const alpha = Math.max(0.2, Math.min(1.0, 1.2 / dist));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        const size = dist < 1.0 ? 1.5 : 1.0;
        ctx.fillRect(px, py, size, size);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

/**
 * WebGLErrorBoundary
 * Catches any WebGL context creation error or GPU failure and gracefully falls back to 2D
 */
class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('WebGL not available or disabled, using 2D canvas fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = () => {
  const [canUseWebGL, setCanUseWebGL] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    setCanUseWebGL(isWebGLAvailable());
  }, []);

  return (
    <div className="w-full h-auto fixed inset-0 z-0 pointer-events-none">
      {canUseWebGL ? (
        <WebGLErrorBoundary fallback={<StarBackground2D />}>
          <Canvas
            camera={{ position: [0, 0, 1] }}
            gl={{
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
            }}
          >
            <Suspense fallback={null}>
              <StarBackground />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <StarBackground2D />
      )}
    </div>
  );
};

export const StarsCanvas = ParticleBackground;

export default ParticleBackground;
