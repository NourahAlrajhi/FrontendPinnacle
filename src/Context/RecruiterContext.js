import { createContext, useReducer,useEffect } from 'react'

export const  RecruiterContext = createContext()

export const RecruiterReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { Recruiter: action.payload }
    case 'LOGOUT':
      return { Recruiter: null }
    default:
      return state
  }
}

export const RecruiterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecruiterReducer, { 
    Recruiter: null
  })

  useEffect(() => {
    const Recruiter = JSON.parse(localStorage.getItem('Recruiter'))

    if (Recruiter) {
      dispatch({ type: 'LOGIN', payload: Recruiter }) 
    }
  }, [])

  console.log('RecruiterContext state:', state)
  
  return (
    <RecruiterContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecruiterContext.Provider>
  )

}