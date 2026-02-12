interface PillLightProps {
  position?: [number, number, number]
  height?: number
  width?: number
  color?: string
  intensity?: number
}

export function PillLight({
  position = [0, 0, 0],
  height = 10,
  width = 0.06,
  color = '#e0f0ff',
  intensity = 4,
}: PillLightProps) {
  return (
    <mesh position={position}>
      <capsuleGeometry args={[width, height, 4, 8]} />
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={intensity}
        color={color}
        toneMapped={false}
      />
    </mesh>
  )
}
