import { useState } from "react"
import { Guesses } from "./Guesses"
import { Keyboard } from "./Keyboard"
import { checkAnswer, initGameState } from "./gameLogic"

const WORD_OF_THE_DAY = "logic"

export function App() {
	const [answer, setAnswer] = useState("")
	const [gameState, setGameState] = useState(initGameState(WORD_OF_THE_DAY))

	const handleOnKeyPress = (key: string) => {
		if (gameState.status !== "playing") return

		const newAnswer = (answer.length >= 5 ? "" : answer) + key
		const newGameState = checkAnswer({
			correctAns: WORD_OF_THE_DAY,
			history: gameState.history,
			tileVal: key,
			tilePos: Math.max(0, newAnswer.length - 1),
		})

		console.log(newGameState)

		if (newGameState.status === "won") {
			setGameState(newGameState)
			return
		}

		setGameState(newGameState)
		setAnswer(newAnswer)
	}

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Wordle</h1>
			<Guesses gameHistory={gameState.history} />
			<div style={{ height: "2rem" }} />
			<Keyboard onKeyPress={handleOnKeyPress} />
		</>
	)
}
