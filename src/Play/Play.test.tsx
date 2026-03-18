import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Play } from "./Play"

vi.mock("#src/shared/hooks/useWordOfTheDay.ts", () => ({
	useWordOfTheDay: () => ({
		data: "apple",
	}),
}))

describe("Play page", () => {
	it("render game play", () => {
		render(
			<MemoryRouter>
				<Play />
			</MemoryRouter>,
		)

		expect(screen.getByRole("heading")).toHaveTextContent("Wordle")

		expect(screen.getByText("Back")).toHaveAttribute("href", "/")
	})
})
