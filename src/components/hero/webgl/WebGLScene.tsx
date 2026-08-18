"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import WebGLObject from "./WebGLObject";

interface WebGLSceneProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  scrollProgress: React.RefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}

export default function WebGLScene({
  mouse,
  scrollProgress,
  isMobile,
  reducedMotion,
}: WebGLSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.9} color="#F7F7F3" />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-5, -4, -3]} intensity={1.2} color="#E5E5DC" />
      <pointLight position={[0, 4, 3]} intensity={1.5} color="#FFFFFF" />

      <Suspense fallback={null}>
        <WebGLObject
          mouse={mouse}
          scrollProgress={scrollProgress}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}
