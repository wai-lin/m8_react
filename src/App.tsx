import { createBrowserRouter, RouterProvider } from "react-router"
import { AppLayout } from "./AppLayout"
import { Home } from "./Home"
import { Leaderboard } from "./Leaderboard"
import { Play } from "./Play"

const router = createBrowserRouter(
	[
		{
			element: <AppLayout />,
			children: [
				{ index: true, Component: Home },
				{ path: "play", Component: Play },
				{ path: "leaderboard", Component: Leaderboard },
			],
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
)

export function App() {
	return <RouterProvider router={router} />
}
