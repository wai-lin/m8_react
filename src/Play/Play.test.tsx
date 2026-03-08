import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { Play } from "./Play"

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
