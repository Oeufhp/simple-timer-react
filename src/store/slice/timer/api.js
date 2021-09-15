import { addTimer, updateTimer } from "./index"

export function addNewTimer(timer) {
	return async dispatch => {
		dispatch(addTimer(timer))
	}
}

export function updatedTimer(listTimer) {
	return async dispatch => {
		dispatch(updateTimer(listTimer))
	}
}
