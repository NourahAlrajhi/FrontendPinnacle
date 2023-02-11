import React from "react";
import { Box, Container } from '@mui/material'
import './Closed_jop_vacancies_main.css'
import Closed_job_table from "./Closed_job_table";
import Closed_job_graph from "./Closed_job_graph";
import { useEffect, useState } from 'react'
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useVacancyContext } from "../../Hook/UseVacancy"

function Closed_jop_vacancies_main() {

    const { Vacancy, dispatchhh } = useVacancyContext()
    const { Positions, dispatch } = usePositionsContext()
    const { Recruiter } = useRecruiterContext()
    const [BarCharVacancyName, setBarCharVacancyName] = useState([]);
    const [BarCharVacancyCandidatEnterviwed, setBarCharVacancyCandidatEnterviwed] = useState([]);

   // const [BarCharVacancyNameForActive, setBarCharVacancyNameForActive] = useState([]);
    const [BarCharVacancyCandidatEnterviwedForActualCandidate, setBarCharVacancyCandidatEnterviwedForActualCandidate] = useState([]);

    const capitalizeWords = (str) => {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
    useEffect(() => {
        console.log("formRows: ", Vacancy);
        const fetchPosition = async () => {
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/ListClosed', {
                headers: { 'Authorization': `Bearer ${Recruiter.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                dispatchhh({ type: 'SET_Vacancy', payload: json })
                console.log("===========")

                console.log("===========")
                var j = 0
                json && json.map((item, i) => {
                    BarCharVacancyName[j] = `${capitalizeWords(item.title)}`
                    BarCharVacancyCandidatEnterviwed[j] = item.InterviewedCandidates
                    BarCharVacancyCandidatEnterviwedForActualCandidate[j]=parseInt(item.CandidateList)
                    j = i + 1
                }
                )

            }
        }

      /*  const fetchPosition2 = async () => {
            //https://backend-pinnacle.herokuapp.com/
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/List', {
              headers: { 'Authorization': `Bearer ${Recruiter.token}` },
            })
            const json = await response.json()
            if (response.ok) {
              dispatchhh({ type: 'SET_Vacancy', payload: json })
              console.log("===========")
              console.log(json)
              console.log("===========")
              var j = 0
              json && json.map((item, i) => {  
                BarCharVacancyNameForActive[j]=`${item.title}`
                BarCharVacancyCandidatEnterviwedForActive[j]=item.InterviewedCandidates
      
                  j = i + 1
              }
              )
              console.log(BarCharVacancyNameForActive)
              console.log(BarCharVacancyCandidatEnterviwedForActive)
              // seteventsList(eventsList)
      
      
            }
      
          }*/
      

        if (Recruiter) {
            fetchPosition()
           // fetchPosition2()
        }
    }, [dispatchhh, Recruiter])

    return (
        <>
            <Box sx={{ height: "100%", overflowX: "hidden", overflowY: "auto" }}>
                <Closed_job_graph DATA1={BarCharVacancyName} DATA2={BarCharVacancyCandidatEnterviwed} DATA2FORACTUAL={BarCharVacancyCandidatEnterviwedForActualCandidate}/>
                <Closed_job_table />
            </Box>
        </>
    )
}

export default Closed_jop_vacancies_main;