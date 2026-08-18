"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WebGLObjectProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  scrollProgress: React.RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}

export default function WebGLObject({
  mouse,
  scrollProgress,
  isMobile,
  reducedMotion,
}: WebGLObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.TorusKnotGeometry>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Clean disposal on unmount to prevent memory leaks
  useEffect(() => {
    const geo = geometryRef.current;
    const mat = materialRef.current;
    return () => {
      if (geo) {
        geo.dispose();
      }
      if (mat) {
        mat.dispose();
      }
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      // Keep static elegant posture for reduced motion
      meshRef.current.rotation.x = 0.35;
      meshRef.current.rotation.y = 0.45;
      meshRef.current.rotation.z = 0.1;
      return;
    }

    const time = state.clock.getElapsedTime();
    const curMouse = mouse.current || { x: 0, y: 0 };
    const curScroll = scrollProgress.current || 0;

    // Organic continuous breathing motion
    const breath = Math.sin(time * 0.7) * 0.04;

    // Target rotation: cursor influence + gentle auto drift + scroll rotation
    const targetRotX =
      curMouse.y * 0.35 + curScroll * 0.7 + Math.sin(time * 0.35) * 0.08;
    const targetRotY =
      curMouse.x * 0.45 + time * 0.06 + Math.cos(time * 0.25) * 0.08;
    const targetRotZ = curScroll * -0.3 + Math.sin(time * 0.4) * 0.04;

    // Target position (subtle parallax shift)
    const targetPosX = curMouse.x * 0.35;
    const targetPosY = -curMouse.y * 0.25 - curScroll * 0.4;
    const targetPosZ = -curScroll * 0.6;

    // Target scale (subtle scroll scale down + breathing)
    const baseScale = isMobile ? 0.8 : 1.1;
    const targetScale = baseScale + breath - curScroll * 0.18;

    // Smooth inertia interpolation (lerp)
    const lerpFactor = isMobile ? 0.03 : 0.045;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      lerpFactor
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotY,
      lerpFactor
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      lerpFactor
    );

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetPosX,
      lerpFactor
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetPosY,
      lerpFactor
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetPosZ,
      lerpFactor
    );

    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor);
    meshRef.current.scale.setScalar(newScale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* 
        Abstract sculptural ribbon/knot. 
        Lower geometry complexity on mobile for optimal performance.
      */}
      <torusKnotGeometry
        ref={geometryRef}
        args={[
          1.15, // radius
          0.38, // tube radius
          isMobile ? 64 : 128, // tubular segments
          isMobile ? 16 : 32, // radial segments
          2, // p
          3, // q
        ]}
      />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#1A1A18"
        roughness={0.28}
        metalness={0.88}
        clearcoat={0.4}
        clearcoatRoughness={0.22}
        reflectivity={0.9}
        iridescence={0.06}
        iridescenceIOR={1.3}
      />
    </mesh>
  );
}
