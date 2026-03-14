const CACHE_KEY = "WOD"

type WordCache = {
	word: string
	date: string // ISO date string YYYY-MM-DD
}

function getTodayDateString(): string {
	const now = new Date()
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

function getCachedWord(): string | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY)
		if (!raw) return null
		const cached = JSON.parse(raw) as WordCache
		if (cached.date === getTodayDateString()) return cached.word
		return null
	} catch {
		return null
	}
}

function setCachedWord(word: string): void {
	const cache: WordCache = { word, date: getTodayDateString() }
	localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

export async function fetchWordOfTheDay(): Promise<string> {
	const cached = getCachedWord()
	if (cached) return cached

	const res = await fetch("https://a04-wordle-api.vercel.app/api/random-word")
	if (!res.ok) throw new Error(`Failed to fetch word: ${res.status}`)

	const data = (await res.json()) as { word: string }
	const word = data.word.toLowerCase()
	setCachedWord(word)
	return word
}
