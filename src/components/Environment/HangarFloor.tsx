import { RigidBody, CuboidCollider } from '@react-three/rapier'

export function HangarFloor() {
  const size = 50
  const chevronCount = 8
  const chevronArmLength = 5
  const chevronThickness = 0.05
  const chevronWidth = 0.6
  const chevronSpacing = 4

  return (
    <group>
      {/* Physics collider */}
      <RigidBody type="fixed">
        <CuboidCollider args={[size / 2, 0.05, size / 2]} position={[0, -0.05, 0]} />
      </RigidBody>

      {/* Polished obsidian floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[size, size, 1, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* Large chevron / arrow markings — white on dark floor */}
      {Array.from({ length: chevronCount }).map((_, i) => {
        const offsetX = (i - chevronCount / 2 + 0.5) * chevronSpacing
        return (
          <group key={`chev-${i}`} position={[offsetX, 0.005, 12]}>
            {/* Left arm */}
            <mesh rotation={[0, Math.PI / 5, 0]}>
              <boxGeometry args={[chevronArmLength, chevronThickness, chevronWidth]} />
              <meshStandardMaterial color="#cccccc" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Right arm */}
            <mesh rotation={[0, -Math.PI / 5, 0]}>
              <boxGeometry args={[chevronArmLength, chevronThickness, chevronWidth]} />
              <meshStandardMaterial color="#cccccc" roughness={0.5} metalness={0.1} />
            </mesh>
          </group>
        )
      })}

      {/* Second row of chevrons further back */}
      {Array.from({ length: chevronCount }).map((_, i) => {
        const offsetX = (i - chevronCount / 2 + 0.5) * chevronSpacing
        return (
          <group key={`chev2-${i}`} position={[offsetX, 0.005, 4]}>
            <mesh rotation={[0, Math.PI / 5, 0]}>
              <boxGeometry args={[chevronArmLength, chevronThickness, chevronWidth]} />
              <meshStandardMaterial color="#aaaaaa" roughness={0.5} metalness={0.1} />
            </mesh>
            <mesh rotation={[0, -Math.PI / 5, 0]}>
              <boxGeometry args={[chevronArmLength, chevronThickness, chevronWidth]} />
              <meshStandardMaterial color="#aaaaaa" roughness={0.5} metalness={0.1} />
            </mesh>
          </group>
        )
      })}

      {/* Floor dot lights — small emissive circles in a grid */}
      {Array.from({ length: 6 }).map((_, xi) =>
        Array.from({ length: 6 }).map((_, zi) => {
          const x = (xi - 2.5) * 8
          const z = (zi - 2.5) * 8
          return (
            <mesh
              key={`dot-${xi}-${zi}`}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[x, 0.003, z]}
            >
              <circleGeometry args={[0.08, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={1.0}
                toneMapped={false}
              />
            </mesh>
          )
        })
      )}
    </group>
  )
}
