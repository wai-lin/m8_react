import { KEYBOARD_LAYOUT } from "../../constants"
import { KeyboardKey } from "../KeyboardKey"
import styles from "./Keyboard.module.css"

interface Props {
	onKeyPress?: (key: string) => void | Promise<void>
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
