import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { PillLight } from './PillLight'

interface HangarWallProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  length?: number
  height?: number
  hasOpening?: boolean
  openingWidth?: number
  openingHeight?: number
}

export function HangarWall({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  length = 50,
  height = 12,
  hasOpening = false,
  openingWidth = 16,
  openingHeight = 10,
}: HangarWallProps) {
  const wallThickness = 0.4
  const segmentWidth = 4
  const buttressWidth = 0.5
  const buttressDepth = 0.5
  const recessDepth = 0.15
  const seamThickness = 0.03
  const segmentCount = Math.floor(length / segmentWidth)

  const segments: { x: number; isInOpening: boolean }[] = []
  for (let i = 0; i < segmentCount; i++) {
    const x = (i - segmentCount / 2 + 0.5) * segmentWidth
    const isInOpening = hasOpening && Math.abs(x) < openingWidth / 2
    segments.push({ x, isInOpening })
  }

  const visibleSegments = segments.filter(s => !s.isInOpening)

  // Panel row heights — 3 rows per segment
  const rowH = height / 3
  const panelInnerW = segmentWidth - buttressWidth * 2
  const halfPanelW = panelInnerW / 2

  return (
    <group position={position} rotation={rotation}>
      {/* Physics colliders */}
      {hasOpening ? (
        <RigidBody type="fixed">
          <CuboidCollider
            args={[(length - openingWidth) / 4, height / 2, (wallThickness + buttressDepth) / 2]}
            position={[-(openingWidth / 2 + (length - openingWidth) / 4), height / 2, 0]}
          />
          <CuboidCollider
            args={[(length - openingWidth) / 4, height / 2, (wallThickness + buttressDepth) / 2]}
            position={[(openingWidth / 2 + (length - openingWidth) / 4), height / 2, 0]}
          />
          <CuboidCollider
            args={[openingWidth / 2, (height - openingHeight) / 2, (wallThickness + buttressDepth) / 2]}
            position={[0, openingHeight + (height - openingHeight) / 2, 0]}
          />
        </RigidBody>
      ) : (
        <RigidBody type="fixed">
          <CuboidCollider
            args={[length / 2, height / 2, (wallThickness + buttressDepth) / 2]}
            position={[0, height / 2, 0]}
          />
        </RigidBody>
      )}

      {/* Full-length recessed back wall */}
      <mesh position={[0, height / 2, -recessDepth]}>
        <boxGeometry args={[length, height, wallThickness]} />
        <meshStandardMaterial color="#606068" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Per-segment detail */}
      {visibleSegments.map((seg, i) => (
        <group key={i} position={[seg.x, 0, 0]}>

          {/* === 3 rows × 2 columns of recessed sub-panels === */}
          {[0, 1, 2].map(row => (
            <group key={`row-${row}`}>
              {/* Left sub-panel */}
              <mesh position={[-halfPanelW / 2, rowH * row + rowH / 2, 0]}>
                <boxGeometry args={[halfPanelW - seamThickness, rowH - seamThickness, wallThickness]} />
                <meshStandardMaterial color="#8a8a94" roughness={0.75} metalness={0.12} />
              </mesh>
              {/* Right sub-panel */}
              <mesh position={[halfPanelW / 2, rowH * row + rowH / 2, 0]}>
                <boxGeometry args={[halfPanelW - seamThickness, rowH - seamThickness, wallThickness]} />
                <meshStandardMaterial color="#8a8a94" roughness={0.75} metalness={0.12} />
              </mesh>
            </group>
          ))}

          {/* === Left buttress === */}
          <mesh position={[-(segmentWidth / 2 - buttressWidth / 2), height / 2, buttressDepth / 2]}>
            <boxGeometry args={[buttressWidth, height, buttressDepth + wallThickness]} />
            <meshStandardMaterial color="#707078" roughness={0.6} metalness={0.2} />
          </mesh>

          {/* === Right buttress === */}
          <mesh position={[(segmentWidth / 2 - buttressWidth / 2), height / 2, buttressDepth / 2]}>
            <boxGeometry args={[buttressWidth, height, buttressDepth + wallThickness]} />
            <meshStandardMaterial color="#707078" roughness={0.6} metalness={0.2} />
          </mesh>

          {/* === Angled bracket at top of left buttress (connects to ceiling) === */}
          <mesh
            position={[-(segmentWidth / 2 - buttressWidth / 2), height - 0.6, buttressDepth + 0.15]}
            rotation={[Math.PI / 6, 0, 0]}
          >
            <boxGeometry args={[buttressWidth - 0.05, 1.2, 0.08]} />
            <meshStandardMaterial color="#606068" roughness={0.7} metalness={0.15} />
          </mesh>

          {/* === Angled bracket at top of right buttress === */}
          <mesh
            position={[(segmentWidth / 2 - buttressWidth / 2), height - 0.6, buttressDepth + 0.15]}
            rotation={[Math.PI / 6, 0, 0]}
          >
            <boxGeometry args={[buttressWidth - 0.05, 1.2, 0.08]} />
            <meshStandardMaterial color="#606068" roughness={0.7} metalness={0.15} />
          </mesh>

          {/* === Angled bracket at base of left buttress === */}
          <mesh
            position={[-(segmentWidth / 2 - buttressWidth / 2), 0.5, buttressDepth + 0.1]}
            rotation={[-Math.PI / 5, 0, 0]}
          >
            <boxGeometry args={[buttressWidth - 0.05, 1.0, 0.08]} />
            <meshStandardMaterial color="#606068" roughness={0.7} metalness={0.15} />
          </mesh>

          {/* === Angled bracket at base of right buttress === */}
          <mesh
            position={[(segmentWidth / 2 - buttressWidth / 2), 0.5, buttressDepth + 0.1]}
            rotation={[-Math.PI / 5, 0, 0]}
          >
            <boxGeometry args={[buttressWidth - 0.05, 1.0, 0.08]} />
            <meshStandardMaterial color="#606068" roughness={0.7} metalness={0.15} />
          </mesh>

          {/* === Pill light on left buttress face === */}
          <PillLight
            position={[-(segmentWidth / 2 - buttressWidth / 2), height / 2, buttressDepth + wallThickness / 2 + 0.02]}
            height={height * 0.7}
            width={0.06}
          />

          {/* === Pill light on right buttress face === */}
          <PillLight
            position={[(segmentWidth / 2 - buttressWidth / 2), height / 2, buttressDepth + wallThickness / 2 + 0.02]}
            height={height * 0.7}
            width={0.06}
          />

          {/* === Real point light on every other segment === */}
          {i % 2 === 0 && (
            <pointLight
              position={[0, height * 0.55, buttressDepth + 1.5]}
              color="#ffffff"
              intensity={2.0}
              distance={15}
            />
          )}
        </group>
      ))}

      {/* Lintel above opening */}
      {hasOpening && (
        <mesh position={[0, openingHeight + (height - openingHeight) / 2, 0]}>
          <boxGeometry args={[openingWidth, height - openingHeight, wallThickness + buttressDepth]} />
          <meshStandardMaterial color="#8a8a94" roughness={0.75} metalness={0.12} />
        </mesh>
      )}
    </group>
  )
}
