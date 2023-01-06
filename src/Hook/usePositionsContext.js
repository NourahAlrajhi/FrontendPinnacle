import { PositionsContext } from "../Context/PositionContext"
import { useContext } from "react"

export const usePositionsContext = () => {
  const context = useContext(PositionsContext)

  if(!context) {
    throw Error('usePositionsContext must be used inside a PositionsContextProvider')
  }

  return context
}