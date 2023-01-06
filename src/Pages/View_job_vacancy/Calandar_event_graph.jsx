import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Scheduler from "react-mui-scheduler"

function Calandar_event_graph() {
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

  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2023-01-01",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2023-01-09",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2023-01-15",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2023-01-24",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
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
    <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }} className="calendar_graph_box">
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", color: "2D3748" }}>Calendar</Typography>
      <Scheduler
        locale="en"
        events={events}
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