import { useState } from 'react'
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { Link, useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useRecruiterContext()

    const login = async (logName, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logName, password ,})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('Recruiter', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)
            navigate("/Dashboard/View_job_vacancy_main");
        }
    }

    return { login, isLoading, error }
}