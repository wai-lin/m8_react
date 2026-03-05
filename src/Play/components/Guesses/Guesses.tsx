import type { GameHistory, TileStatus } from "#types"
import styles from "./Guesses.module.css"

interface Props {
	gameHistory: GameHistory
}

export function Guesses({ gameHistory }: Props) {
	return (
		<section className={styles.guessesContainer}>
			{gameHistory.map((row, rIdx) => (
				<div key={`guess-${rIdx}`} className={styles.guessesRow}>
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

interface GuessTileProps {
	value: string
	status: TileStatus
	rowIdx: number
	tileIdx: number
}

const statusMap = {
	wrong: "",
	correct: styles.correctWord,
	incorrect_place: styles.incorrectPlace,
}

function GuessTile({ value, status, rowIdx, tileIdx }: GuessTileProps) {
	const tileStyle = statusMap[status]

	return (
		<span
			key={`guess-${rowIdx}:char-${tileIdx}`}
			className={`${styles.tile} ${tileStyle}`}
		>
			{value}
		</span>
	)
}
