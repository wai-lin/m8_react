import { Link } from "react-router"
import styles from "./Home.module.css"

const links = [
	{ to: "/play", label: "Play" },
	{ to: "/leaderboard", label: "Leaderboard" },
]

export function Home() {
	return (
		<main className={styles.container}>
			<h1>Welcome to Daily Wordle</h1>

			<article className={styles.linksGroup}>
				{links.map((l) => (
					<Link key={l.to} to={l.to} className={styles.link}>
						{l.label}
					</Link>
				))}
			</article>
		</main>
	)
}
