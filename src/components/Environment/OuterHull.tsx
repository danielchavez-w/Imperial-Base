import { BackSide } from 'three'

interface OuterHullProps {
  size?: number
  height?: number
  openingWidth?: number
  openingHeight?: number
}

export function OuterHull({
  size = 52,
  height = 14,
  openingWidth = 16,
  openingHeight = 10,
}: OuterHullProps) {
  const half = size / 2
  const halfH = height / 2

  const halfOW = openingWidth / 2
  const sideWidth = (size - openingWidth) / 2

  return (
    <group>
      {/* North face */}
      <mesh position={[0, halfH, -half]}>
        <planeGeometry args={[size, height]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* East face */}
      <mesh position={[half, halfH, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size, height]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* West face */}
      <mesh position={[-half, halfH, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, height]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* Top face */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* Bottom face */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* South face — 3 panels framing around the opening */}
      {/* Left panel */}
      <mesh position={[-(halfOW + sideWidth / 2), halfH, half]}>
        <planeGeometry args={[sideWidth, height]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* Right panel */}
      <mesh position={[(halfOW + sideWidth / 2), halfH, half]}>
        <planeGeometry args={[sideWidth, height]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      {/* Top panel above opening */}
      <mesh position={[0, openingHeight + (height - openingHeight) / 2, half]}>
        <planeGeometry args={[openingWidth, height - openingHeight]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>
    </group>
  )
}
