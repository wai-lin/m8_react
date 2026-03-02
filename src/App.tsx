import { useCallback, useEffect, useRef, useState } from "react"
import { Guesses } from "./Guesses"
import { Keyboard } from "./Keyboard"
import { ALLOWED_KEYS } from "./constants"
import { checkAnswer, initGameState } from "./gameLogic"

const WORD_OF_THE_DAY = "logic"

export function App() {
	const gameResultRef = useRef<HTMLDialogElement>(null)
	const [answer, setAnswer] = useState("")
	const [gameState, setGameState] = useState(initGameState(WORD_OF_THE_DAY))

	useEffect(() => {
		if (gameState.status !== "playing") {
			gameResultRef.current?.show()
		}
	}, [gameState.status])

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
			<h1 style={{ textAlign: "center" }}>Wordle</h1>
			<Guesses gameHistory={gameState.history} />
			<div style={{ height: "2rem" }} />
			<Keyboard onKeyPress={handleOnKeyPress} />
			<dialog ref={gameResultRef}>
				{gameState.status === "won" && <h1>Yay.. you won! 🎉</h1>}
				{gameState.status === "failed" && (
					<h1>
						You failed 🥲 the answer is{" "}
						<span
							style={{
								fontWeight: 600,
								textTransform: "uppercase",
								color: "var(--correct-word-bg)",
							}}
						>
							{WORD_OF_THE_DAY}
						</span>
					</h1>
				)}
			</dialog>
		</main>
	)
}
