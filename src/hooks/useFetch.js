import { useEffect, useState } from "react"
import axios from "axios"

const getApplicationToken = () => {
	const token = localStorage.getItem("jwtToken")
	return token && { Authorization: `Bearer ${token}` }
}

const defaultHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json",
	...getApplicationToken()
}
// method = GET POST, PUT, DELETE
const useFetch = ({ method, url, data, headers = defaultHeaders }) => {
	const [response, setResponse] = useState("")
	const [error, setError] = useState("")
	useEffect(() => {
		const fetchData = async () => {
			await axios({
				url,
				method,
				headers,
				data
			})
				.then(res => {
					setResponse(res)
				})
				.catch(err => {
					setError(err)
				})
		}
		fetchData()
	}, [method, url, data, headers])

	return { response, error }
}

export default useFetch
