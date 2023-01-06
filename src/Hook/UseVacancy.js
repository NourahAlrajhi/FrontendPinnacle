import { VacancyContext } from "../Context/VacancyContext"
import { useContext } from "react"

export const useVacancyContext = () => {
  const context = useContext(VacancyContext)

  if(!context) {
    throw Error('useVacancyContext must be used inside a VacancyContextProvider')
  }

  return context
}