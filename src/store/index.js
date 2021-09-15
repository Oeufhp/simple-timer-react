import { configureStore } from "@reduxjs/toolkit"
import timerReducer from "./slice/timer"

export const store = configureStore({
	reducer: {
		timer: timerReducer
	}
})
