import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slice/user"

export const store = configureStore({
	reducer: {
		counter: counterReducer
	}
})
