import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    layout: {
      padding: 50
    },

  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'transparent',
      }
    }
  }

};

const labels = ['Data Architect', 'Data Scientist', 'Computer Engineer', 'Web Designer', 'Chief Engineer'];
// const labels = Utils.months({count: 7});


export const data = {
  labels: labels,
  datasets: [{
    label: 'Applicants per Open Vacancy',
    data: [95, 120, 180, 50, 130, 300],
    backgroundColor: [
      '#14359F',
      '#AE6EE0',
      '#B1E3FF',
      '#95A4FC',
      '#A1E3CB',
    ],
    borderRadius: 10,
    barPercentage: 0.3,
  }]
};

export default function Applicants_vacancy_graph({DATA1,DATA2}) {
  console.log("=============00000000000")
  console.log(DATA1)
  console.log("=============00000000000")
  console.log("=============00000000000")
  console.log(DATA2)
  console.log("=============00000000000")

  const data2 = {
    labels: DATA1,
    datasets: [{
      label: 'Applicants per Open Vacancy',
      data: DATA2,
      backgroundColor: [
        '#14359F',
        '#AE6EE0',
        '#B1E3FF',
        '#95A4FC',
        '#A1E3CB',
      ],
      borderRadius: 10,
      barPercentage: 0.3,
    }]
  };
  
  return (
    <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }} className="calendar_graph_box">
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", color: "2D3748" }}>Calendar</Typography>
      <Bar options={options} data={data2} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px", marginTop: "1rem" }} />
    </Box>
  )
}
