import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Sidebar from '../component/SideBar';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// -------component-----

// ----css import ---
import './Dashboard.css'





// ------------------------
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// --------function----------
export const Layout = () => {

  return (
    <Box sx={{ display: 'flex', overflowX: "hidden" }}>
      <CssBaseline />
      {/* ------sidebar-------- */}
      <Sidebar />
      {/* ------//sidebar-------- */}
      {/* ----contnet----- */}
      <Box component="main" sx={{ position: "relative", flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, overflow: "auto" }}>
        <DrawerHeader />
        {/* -------components render----------- */}
        <Outlet />
        {/* <Table_poistions /> */}
        {/* <Add_position /> */}
        {/* <Edit_details  /> */}
        {/* --- */}
        {/* <Vacancy_main/> */}
        {/* <View_job_vacancy_main/> */}
        {/* <Open_jop_vacancies_main/> */}
        {/* <Closed_jop_vacancies_main/> */}
        {/* ---------//components render--------- */}
      </Box>
      {/* -----//contnet----- */}

    </Box>
  );
 /* <div>
    <Sidebar />

    </div>*/

  }