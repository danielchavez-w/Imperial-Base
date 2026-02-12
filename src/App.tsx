import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Player } from './components/Player'
import { TestLevel } from './components/Levels/TestLevel'
import { useGameStore } from './stores/useGameStore'

function HUD() {
  const health = useGameStore((state) => state.health)
  const ammo = useGameStore((state) => state.ammo)

  return (
    <div className="hud">
      <div className="hud-item health">
        <span className="label">HEALTH</span>
        <span className="value">{health}</span>
      </div>
      <div className="hud-item ammo">
        <span className="label">AMMO</span>
        <span className="value">{ammo}</span>
      </div>
      <div className="crosshair" />
    </div>
  )
}

function Instructions() {
  return (
    <div className="instructions">
      <p>Click to start</p>
      <p>WASD - Move | Mouse - Look | Space - Jump</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        style={{ background: '#000' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#0ff" />

        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#000', 10, 50]} />

        {/* Physics world */}
        <Physics gravity={[0, -20, 0]}>
          <Player />
          <TestLevel />
        </Physics>
      </Canvas>

      <HUD />
      <Instructions />
    </>
  )
}
