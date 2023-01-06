import { createContext, useReducer } from 'react'

export const VacancyContext = createContext()

export const VacancyReducer = (state, action) => {
    console.log(",,,,,,,,,,,,,,,,Vacancy");
  switch (action.type) {
    case 'SET_Vacancy':
      return { 
        Vacancy:action.payload 
      }
    case 'CREATE_Vacancy':
      return { 
        Vacancy: [action.payload, ...state.Vacancy] 
      }
    case 'DELETE_Vacancy':
      return { 
        Vacancy: state.Vacancy.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const VacancyContextProvider = ({ children }) => {
    const [state, dispatchhh] = useReducer(VacancyReducer, { 
        Vacancy: null
    })
    
    return (
      <VacancyContext.Provider value={{ ...state, dispatchhh }}>
        { children }
      </VacancyContext.Provider>
    )
  }