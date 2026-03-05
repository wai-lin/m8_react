import type { GameStatus } from "#types"
import { useEffect, useRef } from "react"
import styles from "./GameResult.module.css"

interface Props {
	status: GameStatus
	answer: string
}

export function GameResult({ status, answer }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (status !== "playing") {
			dialogRef.current?.show()
		}
	}, [status])

	return (
		<dialog ref={dialogRef} className="modal">
			{status === "won" && <h1>Yay.. you won! 🎉</h1>}
			{status === "failed" && (
				<h1>
					You failed 🥲 the answer is{" "}
					<span className={styles.answerHighlight}>{answer}</span>
				</h1>
			)}
		</dialog>
	)
}
