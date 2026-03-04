import styles from "./KeyboardKey.module.css"

interface Props {
	char: string
	onPress?: (key: string) => void | Promise<void>
}

export function KeyboardKey({ char, onPress }: Props) {
	const shouldUnderline = char === "f" || char === "j"
	return (
		<button
			key={`kb-${char}`}
			className={styles.button}
			style={{
				textDecoration: shouldUnderline ? "underline" : "",
			}}
			onClick={() => onPress?.(char)}
		>
			{char}
		</button>
	)
}
