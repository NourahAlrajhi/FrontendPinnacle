import { useState } from 'react'
import { RecruiterContext } from "../Context/RecruiterContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = RecruiterContext()

    const signup = async (logName, password, name) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/Recruiter/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logName, password, name })
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
        }
    }

    return { signup, isLoading, error }
}