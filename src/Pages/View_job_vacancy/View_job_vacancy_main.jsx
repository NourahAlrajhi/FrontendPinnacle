import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import Active_vacancy from './Active_vacancy'
import Candidates_results_main from './Candidates_results/Candidates_results_main'
import Interview_result from './Candidates_results/Interview_result.jsx/Interview_result'
import Closed_jop_vacancies_main from '../Closed_job_vacancies/Closed_jop_vacancies_main'
import Open_jop_vacancies_main from '../Open_jop_vacancies/Open_jop_vacancies_main'
// import Interview_result from './Candidates_results/Interview_result.jsx/Interview_result'
import './View_job_vacancy_main.css'

function View_job_vacancy_main() {
    return (
        <>
            <Container maxWidth="xl" className="contianer_main">
                <Box sx={{ height: "100%", overflowX: "hidden", overflowY: "auto" }}>
                    <Outlet />
                    {/* <Active_vacancy/> */}
                    {/* <Candidates_results_main/> */}
                    {/* <Interview_result/> */}
                </Box>
            </Container>

        </>
    )
}

export default View_job_vacancy_main