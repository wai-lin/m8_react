import { useEffect } from "react"
import { useGame } from "../../context/useGame"
import { GameResult } from "../GameResult"
import { Guesses } from "../Guesses"
import { Keyboard } from "../Keyboard"

export function GameBoard() {
	const { gameState, handleKey } = useGame()

	useEffect(() => {
		const handler = (ev: KeyboardEvent) => handleKey(ev.key)
		window.addEventListener("keyup", handler)
		return () => window.removeEventListener("keyup", handler)
	}, [handleKey])

	return (
		<>
			<Guesses gameHistory={gameState.history} />
			<div className="spacer" />
			<Keyboard onKeyPress={handleKey} />
			<GameResult status={gameState.status} answer={gameState.correctAns} />
		</>
	)
}
