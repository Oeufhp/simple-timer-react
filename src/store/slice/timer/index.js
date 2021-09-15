import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	listTimer: []
}

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		addTimer: (state, action) => {
			state.listTimer.push(action.payload)
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		updateTimer: (state, action) => {
			state.listTimer = action.payload
		}
	}
})

export const { addTimer, updateTimer } = timerSlice.actions

export default timerSlice.reducer
