import { QuestionContext } from "../Context/QuestionContext"
import { useContext } from "react"

export const useQuestionContext = () => {
  const context = useContext(QuestionContext)

  if(!context) {
    throw Error('useQuestionContext must be used inside a QuestionContextProvider')
  }

  return context
}