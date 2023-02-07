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


export const options = {

    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
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
const labels = ['Filter Words'];


export const data = {
    labels: labels,

    datasets: [{
        label: 'Applicants per Open Vacancy',
        data: [15],
        backgroundColor: [
            '#ae6fe1',
        ],
        borderRadius: 10,
        barPercentage: 0.1,
    }],

};

function FilterWord_graph(DATA) {

     const data2 = {
        labels: labels,
    
        datasets: [{
            label: 'Applicants per Open Vacancy',
            data: [DATA],
            backgroundColor: [
                '#ae6fe1',
            ],
            borderRadius: 10,
            barPercentage: 0.1,
        }],
    
    };
    return (
        <>
            <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }}>
                <Bar options={options} data={data2} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px", marginTop: "1rem" }} />
            </Box>
        </>
    )
}

export default FilterWord_graph