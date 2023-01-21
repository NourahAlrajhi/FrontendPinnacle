import { createContext, useReducer } from 'react'

export const EmployeeContext = createContext()

export const EmployeeReducer = (state, action) => {
    console.log(",,,,,,,,,,,,,,,,Vacancy");
  switch (action.type) {
    case 'SET_Employee':
      return { 
        Employee:action.payload 
      }
    case 'CREATE_Employee':
      return { 
        Employee: [action.payload, ...state.Employee] 
      }
    case 'DELETE_Employee':
      return { 
        Employee: state.Employee.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const EmployeeContextProvider = ({ children }) => {
    const [state, dispatchhh] = useReducer(EmployeeReducer, { 
        Employee: null
    })
    
    return (
      <EmployeeContext.Provider value={{ ...state, dispatchhh }}>
        { children }
      </EmployeeContext.Provider>
    )
  }