import { HangarWall } from '../Environment/HangarWall'
import { HangarFloor } from '../Environment/HangarFloor'
import { HangarCeiling } from '../Environment/HangarCeiling'
import { HangarOpening } from '../Environment/HangarOpening'
import { Starfield } from '../Environment/Starfield'
import { OuterHull } from '../Environment/OuterHull'

export function TestLevel() {
  return (
    <group>
      {/* Star-blocking outer hull — only the south opening lets stars through */}
      <OuterHull />

      {/* Floor */}
      <HangarFloor />

      {/* Ceiling */}
      <HangarCeiling />

      {/* North wall (solid) */}
      <HangarWall position={[0, 0, -25]} />

      {/* South wall (with opening to space) */}
      <HangarWall position={[0, 0, 25]} rotation={[0, Math.PI, 0]} hasOpening />
      <HangarOpening position={[0, 0, 25]} />
      <Starfield />

      {/* East wall */}
      <HangarWall position={[25, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* West wall */}
      <HangarWall position={[-25, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}
