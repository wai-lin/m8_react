const keyboardKeys = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
]

interface Props {
	onKeyPress?: (key: string) => void | Promise<void>
}

export function Keyboard({ onKeyPress }: Props) {
	return (
		<div className="keyboard-container">
			{keyboardKeys.map((keyRow) => (
				<div key={keyRow.join()} className="keyboard-row">
					{keyRow.map((key) => (
						<button
							key={`kb-${key}`}
							className="keyboard-button"
							style={{
								textDecoration: key == "f" || key == "j" ? "underline" : "",
							}}
							onClick={() => onKeyPress?.(key)}
						>
							{key}
						</button>
					))}
				</div>
			))}
		</div>
	)
}
