const TOTAL_GUESSES = 6

export function Guesses() {
	return (
		<section className="guesses-container">
			{Array(TOTAL_GUESSES)
				.fill(null)
				.map((_, gidx) => (
					<div key={`guess-${gidx}`} className="guess-row">
						{Array(5)
							.fill("__")
							.map((char, cidx) => (
								<span
									key={`guess-${gidx}:char-${cidx}`}
									className="guess-tile incorrect-place"
								>
									{char}
								</span>
							))}
					</div>
				))}
		</section>
	)
}
