import { useAdminContext } from "../Hook/useAdminContext"

export const useLogoutAdmin = () => {
  const { dispatch2 } = useAdminContext()

  const logout = () => {
    
    // remove user from storage
    localStorage.removeItem('Admin')

    // dispatch logout action
    dispatch2({ type: 'LOGOUT' })
  }

  return { logout }
}