import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Scheduler from "react-mui-scheduler"
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useVacancyContext } from "../../Hook/UseVacancy"

import { useEffect } from 'react'

function Calandar_event_graph({EVENTLIST}) {
  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon",     // or sun
      defaultMode: "month",    // or week | day | timeline
      showNonCurrentDates: false,
    },
    toolbarProps: {
      showSearchBar: false,
      showSwitchModeButtons: false,
      showDatePicker: true
    }
  })

  const { Vacancy, dispatchhh } = useVacancyContext()
  const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const [eventsList, seteventsList] = useState([{}]);

  useEffect(() => {
    console.log("====================222222")
console.log(EVENTLIST)
console.log("====================22222")
    console.log("formRows: ", Vacancy);
    const fetchPosition = async () => {
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
          seteventsList(s => {
            return [
              ...s,
              {
                id: item._id,
                label: `${item.title} Deadline`,
                color: "#263686",
                date: `${(new Date(item.linkExpTime).getFullYear()) + "-0" + (new Date(item.linkExpTime).getMonth() + 1) + "-" + (new Date(item.linkExpTime).getDate())}`,
              }
            ];
          });
          console.log(eventsList)
          /*  eventsList[j] = {
              id: item._id,
              label: `${json.title} Deadline`,
              color: "#263686",
              date: `${(new Date(item.linkExpTime).getFullYear()) + "-" + (new Date(item.linkExpTime).getMonth() + 1) + "-" + (new Date(item.linkExpTime).getDate())}`,
            }
  
            j = i + 1*/
        }
        )
        // seteventsList(eventsList)
      }

    }


    if (Recruiter) {
      fetchPosition()
    }
  }, [dispatchhh, Recruiter])

  const events = [
    {
      id: "event-1",
      label: "Web Designer Vacancy Deadline",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2023-01-01",
      createdAt: new Date(),
      createdBy: "Nourah"
    },
    {
      id: "event-2",
      label: "Data Analysis Vacancy Deadline",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2023-01-09",
      createdAt: new Date(),
      createdBy: "Raya"
    },
    {
      id: "event-3",
      label: "Computer Engineer Vacancy Deadline",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2023-01-15",
      createdAt: new Date(),
      createdBy: "Danah"
    },
    {
      id: "event-4",
      label: "Chief Engineer Vacancy Deadline",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2023-01-24",
      createdAt: new Date(),
      createdBy: "Ghada"
    }
  ]

  const handleCellClick = (event, row, day) => {
    // Do something...
  }

  const handleEventClick = (event, item) => {
    // Do something...
  }

  const handleEventsChange = (item) => {
    // Do something...
  }

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  }

  return (
    // --custom css add for styling --
    <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", paddingTop: "0px" }} className="calendar_graph_box">
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", color: "2D3748" }}>Calendar</Typography>
      <Scheduler
        locale="en"
        events={EVENTLIST}
        legacyStyle={false}
        options={state?.options}
        toolbarProps={state?.toolbarProps}
        onEventsChange={handleEventsChange}
        onCellClick={handleCellClick}
        onTaskClick={handleEventClick}
        onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
      />
    </Box>
  )
}
export default Calandar_event_graph