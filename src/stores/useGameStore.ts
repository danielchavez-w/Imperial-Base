import { create } from 'zustand'

export interface InventoryItem {
  id: string
  type: 'keycard' | 'health' | 'ammo' | 'weapon'
  name: string
}

interface GameState {
  // Player stats
  health: number
  maxHealth: number
  ammo: number
  maxAmmo: number

  // Inventory
  inventory: InventoryItem[]

  // Game state
  isPaused: boolean
  isGameOver: boolean

  // Actions
  takeDamage: (amount: number) => void
  heal: (amount: number) => void
  addAmmo: (amount: number) => void
  useAmmo: (amount?: number) => boolean
  addItem: (item: InventoryItem) => void
  removeItem: (itemId: string) => void
  hasItem: (itemId: string) => boolean
  setPaused: (paused: boolean) => void
  resetGame: () => void
}

const initialState = {
  health: 100,
  maxHealth: 100,
  ammo: 50,
  maxAmmo: 200,
  inventory: [] as InventoryItem[],
  isPaused: false,
  isGameOver: false,
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  takeDamage: (amount: number) => {
    set((state) => {
      const newHealth = Math.max(0, state.health - amount)
      return {
        health: newHealth,
        isGameOver: newHealth <= 0,
      }
    })
  },

  heal: (amount: number) => {
    set((state) => ({
      health: Math.min(state.maxHealth, state.health + amount),
    }))
  },

  addAmmo: (amount: number) => {
    set((state) => ({
      ammo: Math.min(state.maxAmmo, state.ammo + amount),
    }))
  },

  useAmmo: (amount = 1) => {
    const state = get()
    if (state.ammo >= amount) {
      set({ ammo: state.ammo - amount })
      return true
    }
    return false
  },

  addItem: (item: InventoryItem) => {
    set((state) => ({
      inventory: [...state.inventory, item],
    }))
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== itemId),
    }))
  },

  hasItem: (itemId: string) => {
    return get().inventory.some((item) => item.id === itemId)
  },

  setPaused: (paused: boolean) => {
    set({ isPaused: paused })
  },

  resetGame: () => {
    set(initialState)
  },
}))
