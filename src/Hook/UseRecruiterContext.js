import { RecruiterContext } from "../Context/RecruiterContext"
import { useContext } from "react"

export const useRecruiterContext = () => {
  const context = useContext(RecruiterContext)

  if(!context) {
    throw Error('useRecruiterContext must be used inside an RecruiterContextProvider')
  }

  return context
}