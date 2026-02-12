import { RigidBody } from '@react-three/rapier'

export function TestLevel() {
  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>

      {/* Walls */}
      {/* North wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, -25]} castShadow receiveShadow>
          <boxGeometry args={[50, 4, 0.5]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
      </RigidBody>

      {/* South wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 25]} castShadow receiveShadow>
          <boxGeometry args={[50, 4, 0.5]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
      </RigidBody>

      {/* East wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[25, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 4, 50]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
      </RigidBody>

      {/* West wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-25, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 4, 50]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
      </RigidBody>

      {/* Some obstacles for collision testing */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[5, 1, -5]} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#0f3460" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-8, 0.5, 3]} castShadow receiveShadow>
          <boxGeometry args={[4, 1, 4]} />
          <meshStandardMaterial color="#0f3460" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[10, 1.5, 10]} castShadow receiveShadow>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#0f3460" />
        </mesh>
      </RigidBody>

      {/* Ramp for testing slopes */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-5, 0.5, -10]} rotation={[0.3, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 0.2, 6]} />
          <meshStandardMaterial color="#e94560" />
        </mesh>
      </RigidBody>

      {/* Pillar */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
          <meshStandardMaterial color="#533483" />
        </mesh>
      </RigidBody>
    </group>
  )
}
