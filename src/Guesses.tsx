import type { GameHistory, TileStatus } from "./gameLogic"

interface Props {
	gameHistory: GameHistory
}

const tileClass: Record<TileStatus, string> = {
	wrong: "",
	correct: "correct-word",
	incorrect_place: "incorrect-place",
}

export function Guesses({ gameHistory }: Props) {
	return (
		<section className="guesses-container">
			{gameHistory.map((row, rIdx) => (
				<div key={`guess-${rIdx}`} className="guess-row">
					{row.map((tile, tIdx) => {
						const cn = tileClass[tile.status]
						return (
							<span
								key={`guess-${rIdx}:char-${tIdx}`}
								className={`guess-tile ${cn}`}
							>
								{tile.value}
							</span>
						)
					})}
				</div>
			))}
		</section>
	)
}
