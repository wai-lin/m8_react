import type {
	CheckAnswerFnArgs,
	GameHistory,
	GameState,
	TileStatus,
} from "#types"

const MAX_GUESS_CHANCE = 6

function checkTile(
	correctAns: string,
	tileVal: string,
	tilePos: number,
): TileStatus {
	const hasChar = correctAns.includes(tileVal)
	if (hasChar && correctAns[tilePos] !== tileVal) return "incorrect_place"
	else if (hasChar && correctAns[tilePos] === tileVal) return "correct"
	return "wrong"
}

function hasCorrectAns(history: GameHistory) {
	return history.some((row) => {
		return row.every((tile) => tile.status === "correct")
	})
}

export function initGameState(correctAns: string): GameState {
	return {
		correctAns,
		status: "playing",
		history: Array(MAX_GUESS_CHANCE)
			.fill(null)
			.map(() =>
				Array(5)
					.fill(null)
					.map(() => ({ value: "_", status: "wrong" })),
			),
	}
}

export function checkAnswer({
	correctAns,
	history,
	tileVal,
	tilePos,
}: CheckAnswerFnArgs): GameState {
	if (hasCorrectAns(history))
		return {
			correctAns,
			history,
			status: "won",
		}

	const tmpHistory = [...history]

	let histRow = history.findIndex((row) => row.find((t) => t.value === "_"))
	let nextTilePos = tmpHistory[histRow].findIndex((t) => t.value === "_")
	// move to new row if nextTilePos exceed the 5 char count
	if (nextTilePos >= 5) {
		histRow += 1
		nextTilePos = 0
	}

	const titleStatus = checkTile(correctAns, tileVal, tilePos)
	tmpHistory[histRow][nextTilePos] = { value: tileVal, status: titleStatus }

	if (hasCorrectAns(tmpHistory))
		return {
			correctAns,
			history: tmpHistory,
			status: "won",
		}

	// Check if all guesses are used and answer is not correct
	const allRowsFilled = tmpHistory.every((row) =>
		row.every((tile) => tile.value !== "_"),
	)
	if (allRowsFilled && !hasCorrectAns(tmpHistory))
		return {
			correctAns,
			history: tmpHistory,
			status: "failed",
		}

	return {
		correctAns,
		history: tmpHistory,
		status: "playing",
	}
}
