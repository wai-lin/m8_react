import { format } from "date-fns"
import { Link } from "react-router"
import styles from "./Leaderboard.module.css"

const dateFmt = "dd,MM,y (k:mm)"

const scores = [
	{ score: 134, scoredAt: new Date() },
	{ score: 100, scoredAt: new Date() },
	{ score: 99, scoredAt: new Date() },
	{ score: 84, scoredAt: new Date() },
]

export function Leaderboard() {
	return (
		<main className="container">
			<nav>
				<Link to="/" className={styles.link}>
					Back
				</Link>
			</nav>

			<h1 className={styles.title}>Leaderboard</h1>

			<ul className={styles.scores}>
				{scores.map((s) => (
					<li>
						<span className={styles.score}>Score : {s.score}</span>
						<span className={styles.scoredAt}>
							{format(s.scoredAt, dateFmt)}
						</span>
					</li>
				))}
			</ul>
		</main>
	)
}
