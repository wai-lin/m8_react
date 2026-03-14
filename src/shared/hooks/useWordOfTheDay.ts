import { useQuery } from "@tanstack/react-query"
import { fetchWordOfTheDay } from "../api/wordApi"

export const wordOfTheDayQueryKey = ["wordOfTheDay"] as const

export function useWordOfTheDay() {
	return useQuery({
		queryKey: wordOfTheDayQueryKey,
		queryFn: fetchWordOfTheDay,
	})
}
