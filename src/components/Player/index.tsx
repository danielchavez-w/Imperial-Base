import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier'
import { PointerLockControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'

const MOVE_SPEED = 5
const JUMP_FORCE = 5
const PLAYER_HEIGHT = 1.8

export function Player() {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<PointerLockControlsImpl>(null)
  const { camera } = useThree()

  // Input state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })

  // Track if player is grounded
  const isGrounded = useRef(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true
          break
        case 'Space':
          keys.current.jump = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false
          break
        case 'Space':
          keys.current.jump = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!rigidBodyRef.current) return

    const rb = rigidBodyRef.current

    // Get current velocity
    const vel = rb.linvel()

    // Calculate movement direction based on camera orientation
    const forward = new Vector3()
    const right = new Vector3()

    // Get camera direction (only horizontal component)
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    // Get right vector
    right.crossVectors(forward, new Vector3(0, 1, 0)).normalize()

    // Calculate movement impulse
    const impulse = new Vector3(0, 0, 0)

    if (keys.current.forward) impulse.add(forward)
    if (keys.current.backward) impulse.sub(forward)
    if (keys.current.left) impulse.sub(right)
    if (keys.current.right) impulse.add(right)

    // Normalize and apply speed
    if (impulse.length() > 0) {
      impulse.normalize().multiplyScalar(MOVE_SPEED)
    }

    // Set horizontal velocity directly for responsive movement
    rb.setLinvel({ x: impulse.x, y: vel.y, z: impulse.z }, true)

    // Check if grounded (simple check - velocity.y near zero when on ground)
    const pos = rb.translation()
    isGrounded.current = Math.abs(vel.y) < 0.1 && pos.y < PLAYER_HEIGHT + 0.1

    // Jump
    if (keys.current.jump && isGrounded.current) {
      rb.setLinvel({ x: vel.x, y: JUMP_FORCE, z: vel.z }, true)
      keys.current.jump = false // Prevent held jump
    }

    // Update camera position to follow physics body
    camera.position.set(pos.x, pos.y + PLAYER_HEIGHT * 0.4, pos.z)
  })

  return (
    <>
      <PointerLockControls ref={controlsRef} />
      <RigidBody
        ref={rigidBodyRef}
        position={[0, PLAYER_HEIGHT, 0]}
        enabledRotations={[false, false, false]}
        mass={1}
        linearDamping={0.5}
        colliders={false}
      >
        <CapsuleCollider args={[PLAYER_HEIGHT * 0.35, 0.3]} />
      </RigidBody>
    </>
  )
}
