import { CuboidCollider, RigidBody } from '@react-three/rapier'

interface HangarOpeningProps {
  position?: [number, number, number]
  width?: number
  height?: number
}

export function HangarOpening({
  position = [0, 0, 25],
  width = 16,
  height = 10,
}: HangarOpeningProps) {
  const borderThickness = 0.15
  const borderDepth = 0.3
  const emissiveColor = '#80e0ff'
  const emissiveIntensity = 3

  const halfW = width / 2
  const halfH = height / 2
  const centerY = halfH

  return (
    <group position={position}>
      {/* Left border */}
      <mesh position={[-halfW, centerY, 0]}>
        <boxGeometry args={[borderThickness, height, borderDepth]} />
        <meshStandardMaterial
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          color={emissiveColor}
          toneMapped={false}
        />
      </mesh>

      {/* Right border */}
      <mesh position={[halfW, centerY, 0]}>
        <boxGeometry args={[borderThickness, height, borderDepth]} />
        <meshStandardMaterial
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          color={emissiveColor}
          toneMapped={false}
        />
      </mesh>

      {/* Top border */}
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width + borderThickness * 2, borderThickness, borderDepth]} />
        <meshStandardMaterial
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          color={emissiveColor}
          toneMapped={false}
        />
      </mesh>

      {/* Bottom border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + borderThickness * 2, borderThickness, borderDepth]} />
        <meshStandardMaterial
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          color={emissiveColor}
          toneMapped={false}
        />
      </mesh>

      {/* Light from space shining inward */}
      <pointLight
        position={[0, centerY, 2]}
        color="#80e0ff"
        intensity={0.6}
        distance={25}
      />

      {/* Invisible collider to block player */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[halfW, halfH, 0.25]}
          position={[0, centerY, 0]}
        />
      </RigidBody>
    </group>
  )
}
