// Game status and tile types
export type GameStatus = "won" | "failed" | "playing"
export type TileStatus = "wrong" | "correct" | "incorrect_place"

// Game data types
export interface GameTileRecord {
	value: string
	status: TileStatus
}

export type GameHistory = Array<GameTileRecord[]>

export interface GameState {
	correctAns: string
	status: GameStatus
	history: GameHistory
}

// Function argument types
export interface CheckAnswerFnArgs {
	correctAns: string
	history: GameHistory
	tileVal: string
	tilePos: number
}
