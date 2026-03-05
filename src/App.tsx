import { Route, Routes } from "react-router"
import { AppLayout } from "./AppLayout"
import { Home } from "./Home"
import { Play } from "./Play"

export function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="play" element={<Play />} />
			</Route>
		</Routes>
	)
}
