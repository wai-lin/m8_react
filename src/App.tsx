import { createBrowserRouter, RouterProvider } from "react-router"
import { AppLayout } from "./AppLayout"
import { Home } from "./Home"
import { Leaderboard } from "./Leaderboard"

const router = createBrowserRouter(
	[
		{
			element: <AppLayout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "play", element: <Home /> },
				{ path: "leaderboard", element: <Leaderboard /> },
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
