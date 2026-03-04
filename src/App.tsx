import { useCallback, useEffect, useState } from "react"
import { Guesses } from "./Guesses"
import { GameResult } from "./components/GameResult"
import { Keyboard } from "./components/Keyboard"
import { ALLOWED_KEYS } from "./constants"
import { checkAnswer, initGameState } from "./gameLogic"

const WORD_OF_THE_DAY = "logic"

export function App() {
	const [answer, setAnswer] = useState("")
	const [gameState, setGameState] = useState(initGameState(WORD_OF_THE_DAY))

	const handleOnKeyPress = useCallback(
		(key: string) => {
			if (gameState.status !== "playing") return

			const newAnswer = (answer.length >= 5 ? "" : answer) + key
			const newGameState = checkAnswer({
				correctAns: WORD_OF_THE_DAY,
				history: gameState.history,
				tileVal: key,
				tilePos: Math.max(0, newAnswer.length - 1),
			})

			if (newGameState.status === "won") {
				setGameState(newGameState)
				return
			}

			setGameState(newGameState)
			setAnswer(newAnswer)
		},
		[answer, gameState.history, gameState.status],
	)

	useEffect(() => {
		const handler = (ev: KeyboardEvent) => {
			const key = ev.key
			if (ALLOWED_KEYS.includes(key) && gameState.status === "playing")
				handleOnKeyPress(key)
		}

		window.addEventListener("keyup", handler)
		return () => {
			window.removeEventListener("keyup", handler)
		}
	}, [gameState.status, handleOnKeyPress])

	return (
		<main>
			<h1>Wordle</h1>
			<Guesses gameHistory={gameState.history} />
			<div className="spacer" />
			<Keyboard onKeyPress={handleOnKeyPress} />
			<GameResult status={gameState.status} answer={WORD_OF_THE_DAY} />
		</main>
	)
}
