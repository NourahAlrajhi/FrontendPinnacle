import { useRecruiterContext } from "../Hook/UseRecruiterContext"

export const useLogout = () => {
  const { dispatch } = useRecruiterContext()

  const logout = () => {
    
    // remove user from storage
    localStorage.removeItem('Recruiter')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}