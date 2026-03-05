import { Link } from "react-router"
import styles from "./Home.module.css"

export function Home() {
	return (
		<main className={styles.container}>
			<h1>Welcome to Daily Wordle</h1>
			<Link to="/play" className={styles.link}>
				Get Started
			</Link>
		</main>
	)
}
