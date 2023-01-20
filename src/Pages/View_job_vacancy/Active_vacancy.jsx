// import { Box } from "@material-ui/core";
import React from "react";
import Applicants_vacancy_graph from "./Applicants_vacancy_graph";
import Grid from "@mui/material/Unstable_Grid2";
// import { styled } from "@mui/material/styles";
import Active_vacancy_table from "./Active_vacancy_table";
import Calandar_event_graph from "./Calandar_event_graph";
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useVacancyContext } from "../../Hook/UseVacancy"

import { useEffect,useState } from 'react'

const backgroundColor=[
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
  '#14359F',
  '#AE6EE0',
  '#B1E3FF',
  '#95A4FC',
  '#A1E3CB',
]

function Active_vacancy() {


 let data ={}
  const { Vacancy, dispatchhh } = useVacancyContext()
  const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const [eventsList, seteventsList] = useState([{}]);
  const [BarCharVacancyName, setBarCharVacancyName] = useState([]);
  const [BarCharVacancyCandidatEnterviwed, setBarCharVacancyCandidatEnterviwed] = useState([]);


  useEffect(() => {

    console.log("formRows: ", Vacancy);
    const fetchPosition = async () => {
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
       /*   seteventsList(s => {
            return [
              ...s,
              {
                id: item._id,
                label: `${item.title} Deadline`,
                color: "#263686",
                date: `${(new Date(item.linkExpTime).getFullYear()) + "-0" + (new Date(item.linkExpTime).getMonth() + 1) + "-" + (new Date(item.linkExpTime).getDate())}`,
              }
            ];
          });*/
         
           eventsList[j] = {
              id: `event-${i+1}`,
              label: `${item.title} Deadline`,
              color: backgroundColor[i],
              date: `${(new Date(item.linkExpTime).getFullYear()) + "-0" + (new Date(item.linkExpTime).getMonth() + 1) + "-" + (new Date(item.linkExpTime).getDate())}`,
              groupLabel: "Dr Shaun Murphy",
              user: "Dr Shaun Murphy",
              startHour: "08:00 AM",
              endHour: "09:00 AM",
              createdAt: new Date(),
              createdBy: "Nourah"
            }
  
            BarCharVacancyName[j]=`${item.title}`
            BarCharVacancyCandidatEnterviwed[j]=item.InterviewedCandidates

            j = i + 1
        }
        )

        console.log(eventsList)
        console.log(BarCharVacancyName)
        console.log(BarCharVacancyCandidatEnterviwed)
        // seteventsList(eventsList)


      }

    }


    if (Recruiter) {
      fetchPosition()
    }
  }, [dispatchhh, Recruiter])


  return (
    <>
      <Grid container spacing={2} sx={{ overflow: "hidden", margin: "1rem auto", }}>
        <Grid xs={12} lg={6}>
          {/* ---calandar event graph-- */}
          <Calandar_event_graph EVENTLIST={eventsList} />
          {/* ---//calandar event graph-- */}
        </Grid>
        <Grid
          xs={12}
          lg={6}
        >
          <Applicants_vacancy_graph DATA1={BarCharVacancyName} DATA2={BarCharVacancyCandidatEnterviwed}/>
        </Grid>
        <Grid xs={12} >
          <Active_vacancy_table />
        </Grid>
      </Grid>
    </>
  );
}

export default Active_vacancy;
