"use client";

import { Suspense, useEffect, useRef, memo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  useGLTF,
  Center,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_MAP: Record<string, string> = {
  skeleton: "/models/skeleton.glb",
  arthrology: "/models/skeleton.glb",
  muscle: "/models/muscle.glb",
  organs: "/models/organs.glb",
  blood: "/models/blood.glb",
  nerves: "/models/nerves.glb",
  neural: "/models/nerves.glb",
};

Object.values(MODEL_MAP).forEach((path) => useGLTF.preload(path));

function Model({ model }: { model: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const path = MODEL_MAP[model] || MODEL_MAP.skeleton;
  const { scene } = useGLTF(path);

  useEffect(() => {
    const group = groupRef.current;
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry = child.geometry.clone();
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => m.clone());
        } else {
          child.material = child.material.clone();
        }
        child.frustumCulled = false;
      }
    });
    group.add(clone);
    return () => {
      group.remove(clone);
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return <group ref={groupRef} scale={1.2} />;
}

const Scene = memo(function Scene({ model }: { model: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 1.5, 3]} fov={30} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, 2, -5]} intensity={0.3} />
      <Environment preset="city" environmentIntensity={0.6} />
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.3}>
        <Center>
          <Suspense fallback={null}>
            <Model model={model} />
          </Suspense>
        </Center>
      </Float>
      <OrbitControls
        enablePan={false}
        minDistance={1}
        maxDistance={8}
        target={[0, 0, 0]}
      />
    </>
  );
});

export const ModelViewer = memo(function ModelViewer({
  model = "skeleton",
  className = "",
}: {
  model?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 ${className}`}
      style={{ height: "440px" }}
    >
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Scene model={model} />
      </Canvas>
      <div className="absolute bottom-3 right-3 text-[10px] text-white/20 select-none">
        Z-Anatomy (CC BY-SA 4.0)
      </div>
    </div>
  );
});
