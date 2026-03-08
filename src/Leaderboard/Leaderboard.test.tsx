import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { Leaderboard } from "./Leaderboard"

describe("Leaderboard page", () => {
	it("render leaderboard", () => {
		render(
			<MemoryRouter>
				<Leaderboard />
			</MemoryRouter>,
		)

		expect(screen.getByRole("heading")).toHaveTextContent("Leaderboard")

		expect(screen.getByText("Back")).toHaveAttribute("href", "/")
	})
})
