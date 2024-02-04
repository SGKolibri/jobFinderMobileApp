import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            "X-RapidAPI-Key": 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bkzuUzVLzA',
            // "X-RapidAPI-Key": 'a233ad9611msh2b0ca74986aef29p1e2351jsnc97bc7a6f69a',
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
            ...query
        },
    }

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log("Erro: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch