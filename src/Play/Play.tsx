import { checkAnswer, initGameState } from "#src/shared/gameLogic.ts"
import { useCallback, useEffect, useState } from "react"
import { GameResult } from "./components/GameResult"
import { Guesses } from "./components/Guesses"
import { Keyboard } from "./components/Keyboard"
import styles from "./Play.module.css"
import { ALLOWED_KEYS } from "./utils/constants"

const WORD_OF_THE_DAY = "logic"

export function Play() {
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
			<h1 className={styles.title}>Wordle</h1>
			<Guesses gameHistory={gameState.history} />
			<div className="spacer" />
			<Keyboard onKeyPress={handleOnKeyPress} />
			<GameResult status={gameState.status} answer={WORD_OF_THE_DAY} />
		</main>
	)
}
