import { create } from 'zustand'

export interface DoorState {
  id: string
  isOpen: boolean
  isLocked: boolean
  requiredKeycard?: string
}

export interface Objective {
  id: string
  description: string
  isComplete: boolean
  isOptional: boolean
}

interface LevelState {
  // Level identification
  currentLevel: string

  // Level flags
  alarmActive: boolean
  powerEnabled: boolean

  // Doors
  doors: Record<string, DoorState>

  // Objectives
  objectives: Objective[]

  // Actions
  setLevel: (levelId: string) => void
  triggerAlarm: () => void
  disableAlarm: () => void
  setPower: (enabled: boolean) => void

  // Door actions
  setDoor: (doorId: string, state: Partial<DoorState>) => void
  openDoor: (doorId: string) => boolean
  closeDoor: (doorId: string) => void
  unlockDoor: (doorId: string) => void

  // Objective actions
  addObjective: (objective: Objective) => void
  completeObjective: (objectiveId: string) => void
  isLevelComplete: () => boolean

  // Reset
  resetLevel: () => void
}

const initialState = {
  currentLevel: 'test',
  alarmActive: false,
  powerEnabled: true,
  doors: {} as Record<string, DoorState>,
  objectives: [] as Objective[],
}

export const useLevelStore = create<LevelState>((set, get) => ({
  ...initialState,

  setLevel: (levelId: string) => {
    set({
      ...initialState,
      currentLevel: levelId,
    })
  },

  triggerAlarm: () => {
    set({ alarmActive: true })
  },

  disableAlarm: () => {
    set({ alarmActive: false })
  },

  setPower: (enabled: boolean) => {
    set({ powerEnabled: enabled })
  },

  setDoor: (doorId: string, state: Partial<DoorState>) => {
    set((prev) => ({
      doors: {
        ...prev.doors,
        [doorId]: {
          ...prev.doors[doorId],
          ...state,
          id: doorId,
        },
      },
    }))
  },

  openDoor: (doorId: string) => {
    const door = get().doors[doorId]
    if (!door || door.isLocked) {
      return false
    }
    set((prev) => ({
      doors: {
        ...prev.doors,
        [doorId]: { ...prev.doors[doorId], isOpen: true },
      },
    }))
    return true
  },

  closeDoor: (doorId: string) => {
    set((prev) => ({
      doors: {
        ...prev.doors,
        [doorId]: { ...prev.doors[doorId], isOpen: false },
      },
    }))
  },

  unlockDoor: (doorId: string) => {
    set((prev) => ({
      doors: {
        ...prev.doors,
        [doorId]: { ...prev.doors[doorId], isLocked: false },
      },
    }))
  },

  addObjective: (objective: Objective) => {
    set((prev) => ({
      objectives: [...prev.objectives, objective],
    }))
  },

  completeObjective: (objectiveId: string) => {
    set((prev) => ({
      objectives: prev.objectives.map((obj) =>
        obj.id === objectiveId ? { ...obj, isComplete: true } : obj
      ),
    }))
  },

  isLevelComplete: () => {
    const { objectives } = get()
    return objectives
      .filter((obj) => !obj.isOptional)
      .every((obj) => obj.isComplete)
  },

  resetLevel: () => {
    const currentLevel = get().currentLevel
    set({
      ...initialState,
      currentLevel,
    })
  },
}))
