import { Stars } from '@react-three/drei'

export function Starfield() {
  return (
    <group position={[0, 6, 40]}>
      <Stars
        radius={100}
        count={5000}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  )
}
