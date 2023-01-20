import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Stack, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    layout: {
      padding: 'auto'
    },

  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'transparent',
      }

    },
    y: {
      beginAtZero: true,
      grid: {
        tickColor: 'transparent'
      },
      ticks: {
        min: 0,
        max: 800,
        stepSize: 200,

      }

    }
  }

};

const labels = ['', 'Data Architect', 'Data Scientist', 'Junior Dev ', 'Web Designer', 'QA Tester'];
export const data = {
  labels: labels,
  datasets: [{
    label: 'Applicants per Open Vacancy',
    data: [0, 100, 300, 500, 150, 130],
    backgroundColor: [
      '#14359F',
      '#AE6EE0',
      '#B1E3FF',
      '#95A4FC',
      '#A1E3CB',
    ],
    borderColor: '#1C1C1C',
    borderRadius: 10,
    barPercentage: 0.3,
    tension: 0.5
  }, {
    label: 'Applicants per Open Vacancy',
    data: [0, 135, 340, 780, 550, 180],
    backgroundColor: [
      '#14359F',
      '#AE6EE0',
      '#B1E3FF',
      '#95A4FC',
      '#A1E3CB',
    ],
    borderColor: '#7024C4 ',
    borderRadius: 10,
    barPercentage: 0.3,
    tension: 0.5
  }
  ]
};


export default function Closed_job_graph({DATA1,DATA2,DATA2FORACTUAL}) {


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
      borderColor: '#1C1C1C',
      borderRadius: 10,
      barPercentage: 0.3,
      tension: 0.5
    }, {
      
      label: 'Applicants per Open Vacancy',
      data: DATA2FORACTUAL,
      backgroundColor: [
        '#14359F',
        '#AE6EE0',
        '#B1E3FF',
        '#95A4FC',
        '#A1E3CB',
      ],
      borderColor: '#7024C4 ',
      borderRadius: 10,
      barPercentage: 0.3,
      tension: 0.5
    }
    ]
  };

  // ----graph button function---
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <>
      <Box className='mainGreaphBox' sx={{ background: "#F7F9FB", padding: { sx: "1rem", md: "2rem" }, borderRadius: "16px" }}>
        <Box className='titleLine' sx={{ display: "flex", justifyContent: "space-between", width: "99%" }}>
          <Stack direction="sx:{row} , md:{column}" alignItems="center" gap="1rem">
            <Typography variant='h6' sx={{ marginTop: "-4px" }}>
              Total Interviews
            </Typography>
            <Typography variant='body1' sx={{ fontSize: "1rem", fontWeight: "600", color: "gray" }}>
              Total Vacancies
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography >
              <Badge variant='dot' sx={{ margin: "-2px 10px 0 0" }} color="secondary" >
              </Badge>
              All Candidate
            </Typography>
            <Typography >
              <Badge variant='dot' sx={{ margin: "-2px 10px 0 0" }} color="primary">
              </Badge>
              Interviewed Candidate
            </Typography>
          </Stack>
          {/* ---3dot btn--- */}
          <Box sx={{ float: "right" }}>
            <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{ background: "transparent", color: "#222", boxShadow: "none", '&:hover': { background: "transparent", color: "#222", boxShadow: "none" } }}>
              <MoreHorizIcon />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
          </Box>
        </Box>
        {/* --graph--- */}
        <Box sx={{ padding: "1rem" }}>
          <Line options={options} data={data2} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px" }} />
        </Box>
      </Box>
    </>
  )
}
