import { checkAnswer, initGameState } from "#src/shared/gameLogic.ts"
import type { GameState } from "#types"
import { useCallback, useMemo, useState, type ReactNode } from "react"
import type { GameContextValue } from "./gameContextTypes"
import { GameContext } from "./gameContextTypes"

export { GameContext } from "./gameContextTypes"

const ALLOWED_KEYS = "qwertyuiopasdfghjklzxcvbnm".split("")

interface GameProviderProps {
	word: string
	children: ReactNode
}

export function GameProvider({ word, children }: GameProviderProps) {
	const [answer, setAnswer] = useState("")
	const [gameState, setGameState] = useState<GameState>(() =>
		initGameState(word),
	)

	const handleKey = useCallback(
		(key: string) => {
			if (gameState.status !== "playing") return
			if (!ALLOWED_KEYS.includes(key.toLowerCase())) return

			const newAnswer = (answer.length >= 5 ? "" : answer) + key
			const newGameState = checkAnswer({
				correctAns: word,
				history: gameState.history,
				tileVal: key,
				tilePos: Math.max(0, newAnswer.length - 1),
			})

			setGameState(newGameState)
			if (newGameState.status !== "won") {
				setAnswer(newAnswer)
			}
		},
		[answer, gameState.history, gameState.status, word],
	)

	const value = useMemo<GameContextValue>(
		() => ({ gameState, answer, handleKey }),
		[gameState, answer, handleKey],
	)

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
