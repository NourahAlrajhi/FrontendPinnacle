import { createContext, useReducer } from 'react'

export const QuestionContext = createContext()

export const QuestionReducer = (state, action) => {
    console.log(",,,,,,,,,,,,,,,,222222");
    switch (action.type) {
        case 'SET_Question':
            return {
                Questionnnn: action.payload
            } 
            case 'CREATE_Question':
            return { 
                Questionnnn: [action.payload, ...state.Positions] 
            }
        default:
            return state
    }
}

export const QuestionContextProvider = ({ children }) => {
    const [state, dispatchhhhh] = useReducer(QuestionReducer, {
        Questionnnn: null
    })

    return (
        <QuestionContext.Provider value={{ ...state, dispatchhhhh }}>
            {children}
        </QuestionContext.Provider>
    )
}