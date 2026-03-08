import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { Home } from "./Home"

describe("AppLayout page", () => {
	it("render game menu links", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		)

		expect(screen.getByRole("heading")).toHaveTextContent(
			"Welcome to Daily Wordle",
		)

		expect(screen.getByText("Play")).toHaveAttribute("href", "/play")
		expect(screen.getByText("Leaderboard")).toHaveAttribute(
			"href",
			"/leaderboard",
		)
	})
})
