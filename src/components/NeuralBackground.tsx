"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability */

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// ─── Neural particle system with fixed connections ───

function NeuralNetwork({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const isMobile = useMemo(() =>
    typeof window !== "undefined" && window.innerWidth < 768,
  []);
  const count = isMobile ? 90 : 190;

  // Pre-generate particles in a spherical cloud
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      const t = Math.random();
      c.setHSL(0.65 + t * 0.15, 0.6, 0.4 + t * 0.3);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { pos, colors, vel };
  }, [count]);

  // Pre-compute fixed connections (nearest neighbors)
  const connections = useMemo(() => {
    const conns: number[] = [];
    const threshold = isMobile ? 2.4 : 3.0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particles.pos[i * 3] - particles.pos[j * 3];
        const dy = particles.pos[i * 3 + 1] - particles.pos[j * 3 + 1];
        const dz = particles.pos[i * 3 + 2] - particles.pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          conns.push(i, j);
        }
      }
    }
    return conns; // pairs of particle indices
  }, [count, particles, isMobile]);

  // Build line geometry from fixed connections
  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6); // 2 endpoints × 3 coords per connection
    return arr;
  }, [connections]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const pos = posAttr.array as Float32Array;
    const linePos = linesRef.current.geometry.attributes.position.array as Float32Array;

    const mx = mouse.current.x * 0.005;
    const my = mouse.current.y * 0.005;

    // Update particle positions with gentle drift + mouse influence
    for (let i = 0; i < count; i++) {
      pos[i * 3] += particles.vel[i * 3] + mx;
      pos[i * 3 + 1] += particles.vel[i * 3 + 1] + my;
      pos[i * 3 + 2] += particles.vel[i * 3 + 2];

      // Soft sphere constraint
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];
      const z = pos[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 5.5) {
        pos[i * 3] *= 0.99;
        pos[i * 3 + 1] *= 0.99;
        pos[i * 3 + 2] *= 0.99;
      }
    }
    posAttr.needsUpdate = true;

    // Update line endpoints from current particle positions
    for (let k = 0; k < connections.length; k += 2) {
      const i = connections[k];
      const j = connections[k + 1];
      const idx = k * 3;

      linePos[idx] = pos[i * 3];
      linePos[idx + 1] = pos[i * 3 + 1];
      linePos[idx + 2] = pos[i * 3 + 2];
      linePos[idx + 3] = pos[j * 3];
      linePos[idx + 4] = pos[j * 3 + 1];
      linePos[idx + 5] = pos[j * 3 + 2];
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute args={[particles.pos, 3]} attach="attributes-position" />
          <bufferAttribute args={[particles.colors, 3]} attach="attributes-color" />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.05 : 0.07}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute args={[linePositions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <lineBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── Orbital ring helper ───

function OrbitRing({ radius, tilt }: { radius: number; tilt: number }) {
  const points = useMemo(() => {
    const arr = new Float32Array((64 + 1) * 3);
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return arr;
  }, [radius]);

  return (
    <line rotation-x={tilt}>
      <bufferGeometry>
        <bufferAttribute args={[points, 3]} attach="attributes-position" />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
    </line>
  );
}

// ─── Solar corona particles ───

function SunCorona() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.5 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.4;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#fbbf24"
        size={0.025}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Solar System ───

function SolarSystem() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const planetRefs = useRef<(THREE.Mesh | null)[]>([]);
  const earthAtmoRef = useRef<THREE.Mesh>(null);
  const sunInnerGlowRef = useRef<THREE.Mesh>(null);
  const sunOuterGlowRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const earthCloudsRef = useRef<THREE.Mesh>(null);

  // Real textures from Solar System Scope (CC BY 4.0)
  const tex = useTexture({
    sun: "/textures/solar-system/sun.jpg",
    earth: "/textures/solar-system/earth_daymap.jpg",
    clouds: "/textures/solar-system/earth_clouds.jpg",
    moon: "/textures/solar-system/moon.jpg",
    mercury: "/textures/solar-system/mercury.jpg",
    venus: "/textures/solar-system/venus_atmosphere.jpg",
    mars: "/textures/solar-system/mars.jpg",
    saturn: "/textures/solar-system/saturn.jpg",
  });

  const planetTextures = [tex.mercury, tex.venus, tex.earth, tex.mars, tex.saturn];

  const planets = useMemo(
    () => [
      { radius: 1.5, speed: 0.8, size: 0.1, offset: 0, rotSpeed: 0.5 },     // Mercury
      { radius: 2.2, speed: 0.55, size: 0.15, offset: 1.8, rotSpeed: 0.3 }, // Venus
      { radius: 3.0, speed: 0.4, size: 0.2, offset: 3.2, rotSpeed: 0.4 },   // Earth
      { radius: 3.9, speed: 0.25, size: 0.16, offset: 4.5, rotSpeed: 0.35 },// Mars
      { radius: 4.8, speed: 0.15, size: 0.22, offset: 0.7, rotSpeed: 0.2 }, // Saturn
    ],
    []
  );

  const TILT = 0.12;
  const moonConfig = useMemo(() => ({
    orbitRadius: 0.35,
    speed: 2.5,
    size: 0.04,
    offset: 0,
  }), []);

  // Track orbital angles so planets resume from where they stopped
  const planetAngles = useRef<number[]>(planets.map((p) => p.offset));
  const moonAngleRef = useRef(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseVecRef = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Sun rotation
    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.12;
      sunRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
    }

    // Gentle float
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.25) * 0.12;
    }

    // Raycaster for planet hover detection
    const raycaster = raycasterRef.current;
    const mouseVec = mouseVecRef.current;
    mouseVec.set(mouse.current.x, mouse.current.y);
    raycaster.setFromCamera(mouseVec, state.camera);

    const meshes: THREE.Mesh[] = [];
    planetRefs.current.forEach((m) => { if (m) meshes.push(m); });
    if (sunRef.current) meshes.push(sunRef.current);
    const intersects = raycaster.intersectObjects(meshes);

    let isSunHovered = false;
    let hoveredIdx: number | null = null;
    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      if (hit === sunRef.current) {
        isSunHovered = true;
      } else {
        hoveredIdx = planetRefs.current.indexOf(hit);
      }
    }

    const isEarthHovered = hoveredIdx === 2;

    // Sun glow pulse (enhanced on hover)
    if (sunInnerGlowRef.current) {
      const amp = isSunHovered ? 0.12 : 0.04;
      sunInnerGlowRef.current.scale.setScalar(1 + Math.sin(t * (isSunHovered ? 4 : 2)) * amp);
    }
    if (sunOuterGlowRef.current) {
      const amp = isSunHovered ? 0.18 : 0.06;
      sunOuterGlowRef.current.scale.setScalar(1 + Math.sin(t * (isSunHovered ? 3 : 1.5) + 1) * amp);
    }

    // Sun scale on hover
    if (sunRef.current) {
      const sunTarget = isSunHovered ? 1.08 : 1;
      sunRef.current.scale.x += (sunTarget - sunRef.current.scale.x) * 0.06;
      sunRef.current.scale.y += (sunTarget - sunRef.current.scale.y) * 0.06;
      sunRef.current.scale.z += (sunTarget - sunRef.current.scale.z) * 0.06;
    }

    // Camera zoom on Earth hover — smooth lerp
    const targetZ = isEarthHovered ? 4.2 : 7;
    camera.position.z += (targetZ - camera.position.z) * 0.03;

    // Animate each planet
    planetRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = planets[i];
      const isHovered = i === hoveredIdx;

      // Orbit only when not hovered — resumes from stopped position
      if (!isHovered) {
        planetAngles.current[i] += p.speed * delta;
        const flatX = p.radius * Math.cos(planetAngles.current[i]);
        const flatZ = p.radius * Math.sin(planetAngles.current[i]);
        mesh.position.x = flatX;
        mesh.position.y = flatZ * Math.sin(TILT);
        mesh.position.z = flatZ * Math.cos(TILT);
      }

      // Self-rotation — visible thanks to real textures
      mesh.rotation.y += p.rotSpeed * 0.02;

      // Smooth scale on hover (Earth barely changes)
      const hoverScale = i === 2 ? 1.0 : 1.4;
      const targetScale = isHovered ? hoverScale : 1;
      mesh.scale.x += (targetScale - mesh.scale.x) * 0.06;
      mesh.scale.y += (targetScale - mesh.scale.y) * 0.06;
      mesh.scale.z += (targetScale - mesh.scale.z) * 0.06;
    });

    // Earth atmosphere glow enhancement on hover
    if (earthAtmoRef.current) {
      const mat = earthAtmoRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = isEarthHovered ? 0.35 : 0.12;
      mat.opacity += (targetOpacity - mat.opacity) * 0.05;
    }

    // Earth cloud layer — tracks Earth position, rotates independently
    const earthMesh = planetRefs.current[2];
    if (earthCloudsRef.current && earthMesh) {
      earthCloudsRef.current.position.copy(earthMesh.position);
      earthCloudsRef.current.rotation.y += 0.015;
    }

    // Moon orbit around Earth
    if (moonRef.current && earthMesh) {
      moonAngleRef.current += moonConfig.speed * delta;
      moonRef.current.position.x = earthMesh.position.x + moonConfig.orbitRadius * Math.cos(moonAngleRef.current);
      moonRef.current.position.z = earthMesh.position.z + moonConfig.orbitRadius * Math.sin(moonAngleRef.current);
      moonRef.current.position.y = 0.06 * Math.sin(moonAngleRef.current * 2);
      moonRef.current.rotation.y += 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient fill so dark sides aren't pitch black */}
      <ambientLight intensity={0.25} />
      {/* Sun light — directional shading on all planets */}
      <pointLight position={[0, 0, 0]} intensity={4} color="#fff4e0" distance={15} decay={1.5} />

      {/* Sun — real solar surface texture */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial map={tex.sun} />
      </mesh>
      {/* Inner glow — golden */}
      <mesh ref={sunInnerGlowRef}>
        <sphereGeometry args={[0.65, 20, 20]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.12} />
      </mesh>
      {/* Outer glow — amber */}
      <mesh ref={sunOuterGlowRef}>
        <sphereGeometry args={[0.95, 20, 20]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.05} />
      </mesh>

      {/* Solar corona particles */}
      <SunCorona />

      {/* Orbit rings */}
      {planets.map((p, i) => (
        <OrbitRing key={i} radius={p.radius} tilt={TILT} />
      ))}

      {/* Planets — real surface textures */}
      {planets.map((p, i) => (
        <mesh key={i} ref={(el) => { planetRefs.current[i] = el; }}>
          <sphereGeometry args={[p.size, 32, 32]} />
          <meshStandardMaterial
            map={planetTextures[i]}
            roughness={0.65}
            metalness={0.05}
          />
          {/* Earth atmosphere glow shell */}
          {i === 2 && (
            <mesh ref={earthAtmoRef}>
              <sphereGeometry args={[p.size * 1.18, 24, 24]} />
              <meshBasicMaterial color="#88ccff" transparent opacity={0.12} side={THREE.BackSide} />
            </mesh>
          )}
          {/* Saturn ring */}
          {i === 4 && (
            <mesh rotation-x={Math.PI / 2.5}>
              <ringGeometry args={[p.size * 1.4, p.size * 2.5, 64]} />
              <meshBasicMaterial color="#c4956a" transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          )}
        </mesh>
      ))}

      {/* Earth cloud layer — semi-transparent, independently rotating */}
      <mesh ref={earthCloudsRef}>
        <sphereGeometry args={[planets[2].size * 1.02, 32, 32]} />
        <meshBasicMaterial map={tex.clouds} transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {/* Moon — real lunar surface texture */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[moonConfig.size, 16, 16]} />
        <meshStandardMaterial map={tex.moon} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

// ─── Main Scene ───

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    const mx = mouse.current.x * 0.5;
    const my = mouse.current.y * 0.3;
    camera.position.x += (mx * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (-my * 1.5 + 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <NeuralNetwork mouse={mouse} />
      <Suspense fallback={null}>
        <SolarSystem />
      </Suspense>
    </>
  );
}

// ─── Mouse tracker (singleton, module-level) ───

const mouse = { current: { x: 0, y: 0 } };

if (typeof window !== "undefined") {
  let rafPending = false;
  let lastX = 0;
  let lastY = 0;
  window.addEventListener("mousemove", (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      mouse.current.x = (lastX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(lastY / window.innerHeight) * 2 + 1;
      rafPending = false;
    });
  }, { passive: true });
}

export default function NeuralBackground() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 7], fov: 55 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
