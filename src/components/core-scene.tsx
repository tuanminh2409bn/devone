'use client';

import { Canvas, useFrame, type GLProps } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Color, ExtrudeGeometry, Group, PCFShadowMap, Shape } from 'three';
import { WebGPURenderer, MeshStandardNodeMaterial } from 'three/webgpu';
import { color, sin, time } from 'three/tsl';

function Sculpture({ onSlow }: { onSlow: () => void }) {
  const group = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const elapsed = useRef(0);
  const sample = useRef({ frames: 0, seconds: 0, warmup: 30 });
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-0.7, -1.3);
    shape.lineTo(0.22, -1.3);
    shape.lineTo(0.22, -0.96);
    shape.lineTo(-0.34, -0.96);
    shape.lineTo(-0.34, 0.96);
    shape.lineTo(0.22, 0.96);
    shape.lineTo(0.22, 1.3);
    shape.lineTo(-0.7, 1.3);
    shape.closePath();
    const mesh = new ExtrudeGeometry(shape, {
      depth: 0.36,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12,
      curveSegments: 12,
    });
    mesh.translate(0, 0, -0.18);
    return mesh;
  }, []);
  const coreMaterial = useMemo(() => {
    const material = new MeshStandardNodeMaterial({
      color: '#96deff',
      metalness: 0.7,
      roughness: 0.2,
    });
    material.emissiveNode = color('#245fff').mul(sin(time.mul(0.7)).mul(0.15).add(0.8));
    return material;
  }, []);
  useEffect(
    () => () => {
      geometry.dispose();
      coreMaterial.dispose();
    },
    [geometry, coreMaterial],
  );
  useFrame((state, delta) => {
    // Ignore startup and gaps caused by visibility/pause before sampling steady frames.
    if (delta > 0.25) {
      sample.current = { frames: 0, seconds: 0, warmup: 30 };
    } else if (sample.current.warmup > 0) sample.current.warmup--;
    else {
      sample.current.frames++;
      sample.current.seconds += delta;
      if (sample.current.frames >= 120) {
        if (sample.current.frames / sample.current.seconds < 25) onSlow();
        sample.current = { frames: 0, seconds: 0, warmup: 0 };
      }
    }
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    if (group.current) {
      group.current.rotation.x +=
        (-0.12 + state.pointer.y * 0.1 - group.current.rotation.x) * 0.025;
      group.current.rotation.y +=
        (-0.45 + state.pointer.x * 0.2 - group.current.rotation.y) * 0.025;
      group.current.position.y = Math.sin(t * 0.65) * 0.1;
    }
    if (orbit.current) orbit.current.rotation.z = t * 0.04;
  });
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[2, 5, 4]} intensity={6} color="#d5f4ff" />
      <directionalLight position={[-4, -1, 2]} intensity={4} color="#164cff" />
      <pointLight position={[0, 0, 2]} intensity={12} color="#427bff" />
      <group ref={group} rotation={[-0.12, -0.45, -0.17]}>
        <mesh geometry={geometry} position={[-1.05, 0, 0]}>
          <meshPhysicalMaterial
            color="#2561f7"
            metalness={0.8}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        <mesh geometry={geometry} position={[1.05, 0, 0]} rotation={[0, 0, Math.PI]}>
          <meshPhysicalMaterial color="#719eff" metalness={0.8} roughness={0.19} clearcoat={1} />
        </mesh>
        {[-1, 0, 1].map((n) => (
          <mesh key={n} position={[n * 0.42, n * 0.42, 0.15]} material={coreMaterial}>
            <boxGeometry args={[0.29, 0.29, 0.4]} />
          </mesh>
        ))}
        <group ref={orbit}>
          <mesh rotation={[1.1, 0.45, 0]}>
            <torusGeometry args={[2.45, 0.008, 8, 128]} />
            <meshBasicMaterial color="#2866c8" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[0.75, -0.65, 0.6]}>
            <torusGeometry args={[2.8, 0.006, 8, 128]} />
            <meshBasicMaterial color="#527fb9" transparent opacity={0.3} />
          </mesh>
          <mesh position={[2.26, 0.64, 0.45]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#a8eaff" />
          </mesh>
          <mesh position={[-2, -1, -0.4]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#427eff" />
          </mesh>
        </group>
      </group>
      <mesh position={[0, -2.35, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 2.7, 80]} />
        <meshBasicMaterial color="#15397a" transparent opacity={0.13} />
      </mesh>
    </>
  );
}

export default function CoreScene({
  running,
  forceWebGL,
  onFailure,
  onReady,
}: {
  running: boolean;
  forceWebGL: boolean;
  onFailure: () => void;
  onReady: (backend: string) => void;
}) {
  const createRenderer = useCallback<Extract<GLProps, (...args: never[]) => unknown>>(
    async (props) => {
      const renderer = new WebGPURenderer({
        canvas: props.canvas as HTMLCanvasElement,
        antialias: true,
        alpha: true,
        forceWebGL,
      });
      try {
        await renderer.init();
        renderer.setClearColor(new Color('#070b13'), 0);
        onReady(
          'isWebGLBackend' in renderer.backend && renderer.backend.isWebGLBackend
            ? 'webgl'
            : 'webgpu',
        );
        return renderer;
      } catch (error) {
        renderer.dispose();
        onFailure();
        throw error;
      }
    },
    [forceWebGL, onReady, onFailure],
  );
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.2], fov: 44 }}
      shadows={{ enabled: false, type: PCFShadowMap }}
      dpr={[1, 1.5]}
      frameloop={running ? 'always' : 'never'}
      gl={createRenderer}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true });
      }}
      fallback={null}
    >
      <Sculpture onSlow={onFailure} />
    </Canvas>
  );
}
