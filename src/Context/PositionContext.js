import { createContext, useReducer } from 'react'

export const PositionsContext = createContext()

export const PositionsReducer = (state, action) => {
    console.log(",,,,,,,,,,,,,,,,");
  switch (action.type) {
    case 'SET_Position':
      return { 
        Positions:action.payload 
      }
    case 'CREATE_Position':
      return { 
        Positions: [action.payload, ...state.Positions] 
      }
    case 'DELETE_Position':
      return { 
        Positions: state.Positions.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const PositionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PositionsReducer, { 
    Positions: null
  })
  
  return (
    <PositionsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PositionsContext.Provider>
  )
}