import { createContext, useReducer,useEffect } from 'react'

export const  AdminContext = createContext()

export const AdminReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { Admin: action.payload }
    case 'LOGOUT':
      return { Admin: null }
    default:
      return state
  }
}

export const AdminContextProvider = ({ children }) => {
  const [state, dispatch2] = useReducer(AdminReducer, { 
    Admin: null
  })

  useEffect(() => {
    const Admin = JSON.parse(localStorage.getItem('Admin'))

    if (Admin) {
        dispatch2({ type: 'LOGIN', payload: Admin }) 
    }
  }, [])

  console.log('AdminContext state:', state)
  
  return (
    <AdminContext.Provider value={{ ...state, dispatch2 }}>
      { children }
    </AdminContext.Provider>
  )

}