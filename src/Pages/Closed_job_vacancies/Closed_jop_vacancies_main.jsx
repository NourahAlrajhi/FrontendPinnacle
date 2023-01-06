import React from "react";
import { Box, Container } from '@mui/material'
import './Closed_jop_vacancies_main.css'
import Closed_job_table from "./Closed_job_table";
import Closed_job_graph from "./Closed_job_graph";

function Closed_jop_vacancies_main() {
    return (
        <>
            <Box sx={{ height: "100%", overflowX: "hidden", overflowY: "auto" }}>
                <Closed_job_graph />
                <Closed_job_table />
            </Box>
        </>
    )
}

export default Closed_jop_vacancies_main;