"use client";

import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, ThreeElement } from "@react-three/fiber";

export const ImageDistortionMaterial = shaderMaterial(
  {
    uTexture: null,
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
    uScrollVelocity: 0,
    uTime: 0,
    uIntensity: 0.05,
  },
  // Vertex Shader
  /* glsl */ `
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uScrollVelocity;
    uniform float uTime;
    uniform float uIntensity;

    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Gentle wave displacement based on scroll velocity and mouse position
      float waveX = sin(pos.y * 3.5 + uTime * 2.0) * uScrollVelocity * 0.12 * uIntensity;
      float waveY = cos(pos.x * 3.5 + uTime * 2.0) * uScrollVelocity * 0.12 * uIntensity;

      // Subtle 3D plane bending toward cursor
      float distToMouse = distance(uv, uMouse * 0.5 + 0.5);
      float mouseBend = (1.0 - smoothstep(0.0, 0.7, distToMouse)) * uHover * 0.15 * uIntensity;

      pos.z += waveX + waveY + mouseBend;
      vDisplacement = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  /* glsl */ `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uScrollVelocity;
    uniform float uTime;
    uniform float uIntensity;

    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vec2 uv = vUv;

      // Velocity & hover organic distortion offset
      float distortion = sin(uv.y * 8.0 + uTime * 1.5) * uScrollVelocity * 0.01 * uIntensity;
      uv += vec2(distortion * 0.5, distortion);

      // Subtle RGB dispersion on movement for physical refraction feel
      float rgbShift = clamp(abs(uScrollVelocity) * 0.006 + uHover * 0.003, 0.0, 0.012) * uIntensity;

      vec4 r = texture2D(uTexture, uv + vec2(rgbShift, 0.0));
      vec4 g = texture2D(uTexture, uv);
      vec4 b = texture2D(uTexture, uv - vec2(rgbShift, 0.0));

      vec4 color = vec4(r.r, g.g, b.b, g.a);

      // Subtle lighting highlight based on surface displacement
      float light = 1.0 + vDisplacement * 0.12;
      color.rgb *= light;

      gl_FragColor = color;
    }
  `
);

extend({ ImageDistortionMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    imageDistortionMaterial: ThreeElement<typeof THREE.ShaderMaterial>;
  }
}
