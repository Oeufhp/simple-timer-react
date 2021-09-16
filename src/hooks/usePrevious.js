import { useEffect, useRef } from "react"

function usePrevious(value) {
	const timerRef = useRef()
	useEffect(() => {
		timerRef.current = value
	})
	return timerRef.current
}

export default usePrevious
