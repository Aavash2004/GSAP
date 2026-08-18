"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./ImageDistortionMaterial";

interface WebGLImageMeshProps {
  src: string;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  scrollVelocityRef: React.RefObject<number>;
  hovered: boolean;
  intensity: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

type DistortionMaterialUniforms = THREE.ShaderMaterial & {
  uTexture: THREE.Texture | null;
  uMouse: THREE.Vector2;
  uHover: number;
  uScrollVelocity: number;
  uTime: number;
  uIntensity: number;
};

function WebGLImageMesh({
  src,
  mouseRef,
  scrollVelocityRef,
  hovered,
  intensity,
  isMobile,
  reducedMotion,
}: WebGLImageMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<DistortionMaterialUniforms>(null);

  const texture = useTexture(src, (loadedTex) => {
    const tex = Array.isArray(loadedTex) ? loadedTex[0] : loadedTex;
    if (tex) {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    }
  });

  const activeTexture = Array.isArray(texture) ? texture[0] : texture;

  // Clean disposal on unmount
  useEffect(() => {
    const mesh = meshRef.current;
    return () => {
      if (mesh) {
        mesh.geometry?.dispose();
      }
    };
  }, []);

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;

    if (reducedMotion) {
      materialRef.current.uHover = 0;
      materialRef.current.uScrollVelocity = 0;
      return;
    }

    const time = state.clock.getElapsedTime();
    const curMouse = mouseRef.current || { x: 0, y: 0 };
    const curVel = scrollVelocityRef.current || 0;

    // Lerp hover factor
    const targetHover = hovered ? 1.0 : 0.0;
    materialRef.current.uHover = THREE.MathUtils.lerp(
      materialRef.current.uHover,
      targetHover,
      0.08
    );

    // Lerp mouse target
    materialRef.current.uMouse.x = THREE.MathUtils.lerp(
      materialRef.current.uMouse.x,
      curMouse.x,
      0.08
    );
    materialRef.current.uMouse.y = THREE.MathUtils.lerp(
      materialRef.current.uMouse.y,
      curMouse.y,
      0.08
    );

    // Decay scroll velocity smoothly
    materialRef.current.uScrollVelocity = THREE.MathUtils.lerp(
      materialRef.current.uScrollVelocity,
      curVel,
      0.05
    );

    materialRef.current.uTime = time;
    materialRef.current.uIntensity = intensity;

    // Subtle 3D tilt response for physical card/photo weight
    const tiltX = -curMouse.y * 0.12 * (hovered ? 1.5 : 0.5);
    const tiltY = curMouse.x * 0.12 * (hovered ? 1.5 : 0.5);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      tiltX,
      0.06
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      tiltY,
      0.06
    );
  });

  return (
    <mesh ref={meshRef}>
      {/* Subdivided plane geometry for smooth organic vertex curvature */}
      <planeGeometry args={[2, 2, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
      <imageDistortionMaterial
        ref={materialRef}
        uTexture={activeTexture}
        transparent
      />
    </mesh>
  );
}

type WebGLImageCanvasProps = WebGLImageMeshProps;

export default function WebGLImageCanvas(props: WebGLImageCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.8], fov: 60 }}
      dpr={props.isMobile ? 1 : [1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      className="h-full w-full pointer-events-none"
    >
      <Suspense fallback={null}>
        <WebGLImageMesh {...props} />
      </Suspense>
    </Canvas>
  );
}
