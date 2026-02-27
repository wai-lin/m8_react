import { Guesses } from "./Guesses"
import { Keyboard } from "./Keyboard"

export function App() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>Wordle</h1>
			<Guesses />
			<div style={{ height: "2rem" }} />
			<Keyboard />
		</>
	)
}
