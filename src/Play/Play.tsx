import { cn } from "#src/shared/className.ts"
import { useWordOfTheDay } from "#src/shared/hooks/useWordOfTheDay.ts"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Link } from "react-router"
import { GameBoard } from "./components/GameBoard/index"
import { GameProvider } from "./context/GameContext"
import styles from "./Play.module.css"

function PlayFallback() {
	return (
		<main>
			<nav className={cn(styles.nav, "container")}>
				<Link to="/" className={styles.link}>
					Back
				</Link>
			</nav>
			<p className={styles.status}>Loading today's word…</p>
		</main>
	)
}

function PlayErrorFallback() {
	return (
		<main>
			<nav className={cn(styles.nav, "container")}>
				<Link to="/" className={styles.link}>
					Back
				</Link>
			</nav>
			<p className={styles.status}>
				Failed to load today's word. Please try again later.
			</p>
		</main>
	)
}

function PlayContent() {
	const { data: word } = useWordOfTheDay()

	return (
		<main>
			<nav className={cn(styles.nav, "container")}>
				<Link to="/" className={styles.link}>
					Back
				</Link>
			</nav>
			<h1 className={styles.title}>Wordle</h1>
			<GameProvider word={word}>
				<GameBoard />
			</GameProvider>
		</main>
	)
}

export function Play() {
	return (
		<ErrorBoundary fallback={<PlayErrorFallback />}>
			<Suspense fallback={<PlayFallback />}>
				<PlayContent />
			</Suspense>
		</ErrorBoundary>
	)
}
