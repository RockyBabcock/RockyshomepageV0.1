import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { SkillItem } from '../../data/skills';
import { TechLogo } from './TechLogo';
import { isWebGLAvailable } from '../../utils';

interface SkillConstellationProps {
  skills: SkillItem[];
  activeSkill: SkillItem;
  onSelectSkill: (skill: SkillItem) => void;
}

/**
 * Creates a circular glowing particle texture with soft radial falloff for Three.js sprites.
 */
function createNodeTexture(colorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(0.25, colorHex);
  gradient.addColorStop(0.65, `${colorHex}66`);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

/**
 * SkillConstellation
 * 
 * Interactive 3D Three.js Constellation Stage with Radial Vignette Boundary.
 * Features:
 * - 3D orbiting celestial nodes interconnected by dynamic constellation line segments
 * - Interactive raycasting: hover and click nodes to select active skill
 * - Strict radial vignette gradient mask preventing screen-edge clipping or text overlap
 * - Quick-select tech pod matrix below for immediate direct access
 */
export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  skills,
  activeSkill,
  onSelectSkill,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Distribute nodes evenly over a 3D sphere using Fibonacci sphere distribution
  const nodePositions = useMemo(() => {
    const total = skills.length;
    const radius = 3.6;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return skills.map((skill, i) => {
      const y = 1 - (i / (total - 1 || 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      return {
        skill,
        position: new THREE.Vector3(x, y * radius, z),
      };
    });
  }, [skills]);

  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (!isWebGLAvailable()) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 9.8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 2. Add Constellation Interconnection Lines
    const linePositions: number[] = [];
    const maxDistance = 3.2;

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].position.distanceTo(nodePositions[j].position);
        if (dist < maxDistance) {
          linePositions.push(
            nodePositions[i].position.x,
            nodePositions[i].position.y,
            nodePositions[i].position.z,
            nodePositions[j].position.x,
            nodePositions[j].position.y,
            nodePositions[j].position.z
          );
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const constellationLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    constellationGroup.add(constellationLines);

    // 3. Add Tech Node Sprites
    const spriteMap = new Map<string, THREE.Sprite>();

    nodePositions.forEach(({ skill, position }) => {
      const texture = createNodeTexture(skill.brandColor || '#A855F7');
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: skill.id === activeSkill.id ? 1 : 0.7,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      const baseScale = skill.id === activeSkill.id ? 0.95 : 0.65;
      sprite.scale.set(baseScale, baseScale, 1);
      sprite.userData = { skill };

      constellationGroup.add(sprite);
      spriteMap.set(skill.id, sprite);
    });

    // 4. Raycasting & Mouse Tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(constellationGroup.children);
      const hit = intersects.find((i) => i.object.userData?.skill);
      if (hit && hit.object.userData?.skill) {
        onSelectSkill(hit.object.userData.skill);
      }
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('click', onClick);

    // 5. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle celestial auto-rotation
      if (!isDragging) {
        targetRotationY += 0.0035;
        targetRotationX = Math.sin(elapsedTime * 0.5) * 0.12;
      }

      constellationGroup.rotation.y += (targetRotationY - constellationGroup.rotation.y) * 0.08;
      constellationGroup.rotation.x += (targetRotationX - constellationGroup.rotation.x) * 0.08;

      // Raycast hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(constellationGroup.children);
      const hit = intersects.find((i) => i.object.userData?.skill);

      if (hit && hit.object.userData?.skill) {
        setHoveredSkillId(hit.object.userData.skill.id);
        canvas.style.cursor = 'pointer';
      } else {
        setHoveredSkillId(null);
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      // Dynamic Node Pulsing & Highlighting
      nodePositions.forEach(({ skill }) => {
        const sprite = spriteMap.get(skill.id);
        if (!sprite) return;

        const isCurrentActive = skill.id === activeSkill.id;
        const isHovered = skill.id === hit?.object.userData?.skill?.id;

        const targetScale = isCurrentActive ? 1.05 + Math.sin(elapsedTime * 4) * 0.08 : isHovered ? 0.9 : 0.62;
        sprite.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);

        const material = sprite.material as THREE.SpriteMaterial;
        material.opacity = isCurrentActive ? 1 : isHovered ? 0.95 : 0.65;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('click', onClick);
      renderer.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      scene.clear();
    };
  }, [nodePositions, activeSkill.id, onSelectSkill]);

  return (
    <div className="w-full flex flex-col items-center relative select-none">
      {/* 
        3D CONSTELLATION STAGE WITH VIGNETTE BOUNDARY:
        Masked with radial vignette to guarantee rotating nodes never clip awkwardly
        or collide with surrounding components.
      */}
      <div
        ref={mountRef}
        className="w-full h-[320px] sm:h-[380px] md:h-[420px] relative rounded-3xl overflow-hidden flex items-center justify-center"
        style={{
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.72) 68%, rgba(0, 0, 0, 0.18) 86%, transparent 98%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.72) 68%, rgba(0, 0, 0, 0.18) 86%, transparent 98%)',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />

        {/* Outer radial dark vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 48%, rgba(10, 7, 30, 0.35) 75%, rgba(10, 7, 30, 0.95) 98%)',
          }}
        />

        {/* 3D Orbit Node Floating Tooltip */}
        {hoveredSkillId && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a071e]/90 border border-purple-500/30 backdrop-blur-md font-mono text-xs text-purple-200 pointer-events-none flex items-center gap-2 shadow-xl z-30">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Click node to inspect</span>
          </div>
        )}
      </div>

      {/* 
        INTERACTIVE TECH POD MATRIX / TRAY:
        Shows the skills in current view for quick point-and-click or touch access.
      */}
      <div className="w-full mt-4 sm:mt-6">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
            {skills.length} Tech Pods in Orbit
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-purple-400">
            Drag sphere to rotate
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-h-[160px] sm:max-h-[190px] overflow-y-auto p-2 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-md">
          {skills.map((skill) => {
            const isActive = activeSkill.id === skill.id;
            const brandColor = skill.brandColor || '#A855F7';

            return (
              <motion.button
                key={`tray-skill-${skill.id}`}
                type="button"
                onClick={() => onSelectSkill(skill)}
                onMouseEnter={() => onSelectSkill(skill)}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900/95 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] hover:border-white/20'
                } border backdrop-blur-xl`}
                style={{
                  borderColor: isActive ? brandColor : undefined,
                }}
                aria-label={skill.name}
              >
                {/* Tech Logo */}
                <div
                  className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 8px ${brandColor})`
                      : undefined,
                  }}
                >
                  <TechLogo id={skill.id} size={18} color={isActive ? brandColor : undefined} />
                </div>

                {/* Skill Name */}
                <span
                  className={`font-mono text-xs tracking-wider transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-neutral-300 group-hover:text-white'
                  }`}
                >
                  {skill.name}
                </span>

                {/* Active Dot */}
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: brandColor, boxShadow: `0 0 8px ${brandColor}` }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
