# Project: Imperial Base (Director's Cut)
A 3D FPS game inspired by GoldenEye 007 mechanics, set in a Star Wars Imperial base.

## Tech Stack (MANDATORY)
- **Framework:** React + Vite
- **3D Engine:** React Three Fiber (@react-three/fiber)
- **Physics:** @react-three/rapier (CRITICAL: Used for all collision and movement)
- **State:** Zustand (Health, Ammo, Game Over state)

## Core Gameplay Rules
- **Movement:** GoldenEye style (smooth sliding, no sprint).
- **Shooting:** A280 Blaster Rifle. Lasers travel slowly (not instant hitscan).
- **Enemies:** Stormtroopers. Low accuracy, patrol behavior.
- **Aesthetic:** Brutalist sci-fi. Grey walls, white lights, reflective black floors.
- **Menu:** Holographic wrist projector (Star Wars style).

## Director's Note
- Always use "Plan Mode" before building complex features.

## Project Status (Updated Feb 3)
- **DONE:** - Migrated from HTML to React Three Fiber.
  - Installed Physics (Rapier) and State Manager (Zustand).
  - Basic Player Movement (WASD + Jump) is working.
- **CURRENT FOCUS:** Restoring the visual style (Lighting/Textures/Map/Environment/Effects) and building the Weapon System.
- **NEXT UP:** Enemy AI (Stormtroopers).