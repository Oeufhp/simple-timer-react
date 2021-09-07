import { BrowserRouter, Route, Switch } from "react-router-dom"
import ApplicationLayout from "../container/ApplicationLayout/loadable"

export default (
	<BrowserRouter>
		<Switch>
			<Route path='/' component={ApplicationLayout} />
		</Switch>
	</BrowserRouter>
)
