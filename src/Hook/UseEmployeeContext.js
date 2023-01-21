import { EmployeeContext } from "../Context/EmployeeContext"
import { useContext } from "react"

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)

  if(!context) {
    throw Error('useEmployeeContext must be used inside a EmployeeContextProvider')
  }

  return context
}