"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  useGLTF,
  Center,
} from "@react-three/drei";

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
  const path = MODEL_MAP[model] || MODEL_MAP.skeleton;
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.2} />;
}

function Scene({ model }: { model: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[2.2, 0.8, 2.8]} fov={35} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} />
      <spotLight position={[0, 3, 0]} intensity={0.3} angle={Math.PI / 3} />
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.3}>
        <Center>
          <Suspense fallback={null}>
            <Model model={model} />
          </Suspense>
        </Center>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#000" transparent opacity={0} />
      </mesh>
      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        target={[0, 0, 0]}
      />
    </>
  );
}

export function ModelViewer({
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
}
