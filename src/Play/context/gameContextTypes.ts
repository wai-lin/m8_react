import type { GameState } from "#types"
import { createContext } from "react"

export interface GameContextValue {
	gameState: GameState
	answer: string
	handleKey: (key: string) => void
}

export const GameContext = createContext<GameContextValue | null>(null)
