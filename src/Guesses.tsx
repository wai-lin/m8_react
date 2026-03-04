import { GuessTile } from "./components/GuessTile"
import type { GameHistory } from "./types"

interface Props {
	gameHistory: GameHistory
}

export function Guesses({ gameHistory }: Props) {
	return (
		<section className="guesses-container">
			{gameHistory.map((row, rIdx) => (
				<div key={`guess-${rIdx}`} className="guesses-row">
					{row.map((tile, tIdx) => (
						<GuessTile
							key={`guess-${rIdx}:char-${tIdx}`}
							value={tile.value}
							status={tile.status}
							rowIdx={rIdx}
							tileIdx={tIdx}
						/>
					))}
				</div>
			))}
		</section>
	)
}
