import type { TileStatus } from "../../types"
import styles from "./GuessTile.module.css"

interface Props {
	value: string
	status: TileStatus
	rowIdx: number
	tileIdx: number
}

export function GuessTile({ value, status, rowIdx, tileIdx }: Props) {
	const statusMap = {
		wrong: "",
		correct: styles.correctWord,
		incorrect_place: styles.incorrectPlace,
	}

	const className = statusMap[status]

	return (
		<span
			key={`guess-${rowIdx}:char-${tileIdx}`}
			className={`${styles.tile} ${className}`}
		>
			{value}
		</span>
	)
}
