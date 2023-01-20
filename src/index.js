


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecruiterContextProvider } from './Context/RecruiterContext'
import { PositionsContextProvider } from './Context/PositionContext'
import { MenuProvider } from 'react-native-popup-menu';
import { VacancyContextProvider } from './Context/VacancyContext'
import { QuestionContextProvider } from './Context/QuestionContext'
import { AdminContextProvider } from './Context/AdminContext'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AdminContextProvider>
    <RecruiterContextProvider>
      <PositionsContextProvider>
        <QuestionContextProvider>
          <VacancyContextProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </VacancyContextProvider>
        </QuestionContextProvider>
      </PositionsContextProvider>
    </RecruiterContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
