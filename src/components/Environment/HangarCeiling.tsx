export function HangarCeiling() {
  const ceilingHeight = 12
  const size = 50
  const mainBeamCount = 6
  const crossBeamCount = 6
  const mainBeamH = 0.6
  const mainBeamW = 0.35
  const crossBeamH = 0.3
  const crossBeamW = 0.15

  // Diagonal brace positions — between each pair of main beams
  const braceSpacing = size / mainBeamCount

  return (
    <group>
      {/* Ceiling plane — dark but visible */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ceilingHeight, 0]}>
        <planeGeometry args={[size, size, 1, 1]} />
        <meshStandardMaterial color="#2a2a30" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Main transverse beams — X direction (spanning the room width) */}
      {Array.from({ length: mainBeamCount + 1 }).map((_, i) => {
        const z = (i - mainBeamCount / 2) * braceSpacing
        return (
          <mesh key={`mx-${i}`} position={[0, ceilingHeight - mainBeamH / 2, z]}>
            <boxGeometry args={[size, mainBeamH, mainBeamW]} />
            <meshStandardMaterial color="#3a3a42" roughness={0.7} metalness={0.2} />
          </mesh>
        )
      })}

      {/* Main longitudinal beams — Z direction */}
      {Array.from({ length: mainBeamCount + 1 }).map((_, i) => {
        const x = (i - mainBeamCount / 2) * braceSpacing
        return (
          <mesh key={`mz-${i}`} position={[x, ceilingHeight - mainBeamH / 2, 0]}>
            <boxGeometry args={[mainBeamW, mainBeamH, size]} />
            <meshStandardMaterial color="#3a3a42" roughness={0.7} metalness={0.2} />
          </mesh>
        )
      })}

      {/* Cross-braces (diagonals) in select grid cells for truss look */}
      {Array.from({ length: crossBeamCount }).map((_, i) => {
        const z = (i - crossBeamCount / 2 + 0.5) * braceSpacing
        return (
          <group key={`cb-${i}`}>
            {/* Diagonal going one way */}
            <mesh
              position={[0, ceilingHeight - mainBeamH - crossBeamH / 2, z]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <boxGeometry args={[braceSpacing * 1.1, crossBeamH, crossBeamW]} />
              <meshStandardMaterial color="#333338" roughness={0.75} metalness={0.15} />
            </mesh>
            {/* Diagonal going other way */}
            <mesh
              position={[0, ceilingHeight - mainBeamH - crossBeamH / 2, z]}
              rotation={[0, -Math.PI / 4, 0]}
            >
              <boxGeometry args={[braceSpacing * 1.1, crossBeamH, crossBeamW]} />
              <meshStandardMaterial color="#333338" roughness={0.75} metalness={0.15} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
