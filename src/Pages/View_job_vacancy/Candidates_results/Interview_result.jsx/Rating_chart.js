import React from "react";
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
import { Box } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
            padding: 50
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
            border: {
                display: false
            },

        }
    }

};
const labels = ['Answers Similarity'];


export const data = {
    labels: labels,
    datasets: [{
        label: 'Applicants per Open Vacancy',
        data: [95],
        backgroundColor: [
            '#b1e2fe',
        ],
        borderRadius: 10,
        barPercentage: 0.1,
    }]
};

function Rating_chart(DATA) {


     const dat2 = {
        labels: labels,
        datasets: [{
            label: 'Applicants per Open Vacancy',
            data: [DATA],
            backgroundColor: [
                '#b1e2fe',
            ],
            borderRadius: 10,
            barPercentage: 0.1,
        }]
    };

    return (
        <>
            <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }}>
                <Bar options={options} data={dat2} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px", marginTop: "1rem" }} />
            </Box>
        </>
    )
}

export default Rating_chart