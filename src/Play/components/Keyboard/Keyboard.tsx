import { KEYBOARD_LAYOUT } from "#src/Play/utils/constants.ts"
import styles from "./Keyboard.module.css"

interface Props {
	onKeyPress?: (key: string) => void
}

export function Keyboard({ onKeyPress }: Props) {
	return (
		<div className={styles.container}>
			{KEYBOARD_LAYOUT.map((keyRow) => (
				<div key={keyRow.join()} className={styles.row}>
					{keyRow.map((key) => (
						<KeyboardKey key={`kb-${key}`} char={key} onPress={onKeyPress} />
					))}
				</div>
			))}
		</div>
	)
}

interface KeyboardKeyProps {
	char: string
	onPress?: (key: string) => void
}

function KeyboardKey({ char, onPress }: KeyboardKeyProps) {
	const shouldUnderline = char === "f" || char === "j"
	return (
		<button
			className={styles.button}
			style={{ textDecoration: shouldUnderline ? "underline" : "" }}
			onClick={() => onPress?.(char)}
		>
			{char}
		</button>
	)
}
