/*import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,

} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { ImProfile, ImHome } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useRecruiterContext } from "../Hook/UseRecruiterContext"*/


import { ImProfile, ImHome } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Dashboard_footer from './Dashboard_footer';
import PinnaclLogo from '../images/PinnacleLogo.png'
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useNavigate } from 'react-router';

import Navbar from './Navbar';


// ------------------------

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('xs')]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const Sidebar = ({ children }) => {
 

    const { Recruiter } = useRecruiterContext()
    let RECRUITERNAME=`${Recruiter.RecName}`
   let  index = RECRUITERNAME.indexOf(' '); 
   if(index<=0){
    RECRUITERNAME=RECRUITERNAME
   
   }else{
    RECRUITERNAME=RECRUITERNAME.substring(0,index)
   }
 
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };
    // --small screen in bydefault sidebar off--
    const windowWidth = window.innerWidth;
    React.useEffect(() => {
        if (windowWidth <= 600) {
            setOpen(false)
        }
    }, [])
    // --//small screen in bydefault sidebar off--

    // ---
    let navigate = useNavigate()
    // ----sidebar submenu hide show---
    const [submenuopen, setsubmenuclose] = React.useState("submenuClose");
    const subManuFun = () => {
        if (submenuopen == "submenuClose") {
            setsubmenuclose("submenuShow")
        }
    }
    const subManuFunHide = () => {
        if (submenuopen == "submenuShow") {
            setsubmenuclose("submenuClose")
        }
    }

    // ---create sub menu and pass in lists loop--
    const subManu = <List >
        <ListItem disablePadding>
            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main/Open_jop_vacancies_main"  >
                <ListItemText primary="Open Jop Vacancies" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>

            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main">
                <ListItemText primary="Active Job Vacancies" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main">
                <ListItemText primary="Closed Jop Vacancies" />
            </ListItemButton>
        </ListItem>
    </List>
    // -------------
    return (
        <>
            {/* ---------appbar------- */}
            <Navbar handleDrawerOpenC={handleDrawerOpen} AppBarC={AppBar} openC={open} />
            {/* ---------//Appbar------- */}
            {/* ---------Sidebar------- */}
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: "center", gap: "2px" }}>
                        <img
                            src={PinnaclLogo}
                            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={"header_img"}
                            loading="lazy"
                        />
                        <Typography  style={{ margin: "1px" ,fontSize:"22px"}} fontWeight={700}>
                            Pinnacle
                        </Typography>
                    </Box>

                </DrawerHeader>
                <Divider />
                {/* ---name--- */}
                <Typography textAlign="left" padding="20px 0 0 20px" overflow='hidden' textOverflow='ellipsis' style={{fontSize:"22px"}} fontWeight={700}>
                    Hello, {RECRUITERNAME}
                </Typography>
                {/* ---- */}
                <List>
                    {[{ name: 'Dashboard', urlLink: "/home" }, { name: 'Job Vacancies', subManu: subManu, subManuFun: subManuFun }, { name: 'Positions', urlLink: "/PositionList" }].map((text, index) => (
                        <ListItem key={index} sx={{ display: 'block', overflow: "hidden" ,fontSize:"22px",fontWeight:"700"}} onClick={() => navigate(text.urlLink)} onMouseEnter={text.subManuFun} onMouseLeave={subManuFunHide} >
                            <ListItemButton
                                sx={{
                                    minHeight: 38,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1.5,
                                }}
                              
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 0.5 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 ? <ImHome /> : index === 1 ? <HiOutlineUserGroup /> : <ImProfile />}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 5 : 0 }} />
                            </ListItemButton>
                            <Box onMouseEnter={subManuFun} className={submenuopen}  >
                                {text.subManu}
                            </Box>
                        </ListItem>
                    ))}
                </List>
                {open ? <Button variant="contained" sx={{ margin: " 0 10px", backgroundColor: "#14359F" }} startIcon={<AddIcon />} onClick={() => navigate("/CreateJobbVacancy")}>New Job Vacancy</Button> : <Button variant="contained" sx={{ margin: " 0 10px", backgroundColor: "#14359F", width: "50px", minWidth: "auto" }} startIcon={<AddIcon />}></Button>}
                {/* --demo button for show interview screen-- */}
               {/* <Button variant="contained" sx={{ margin: " 20px 10px", backgroundColor: "gray" }} onClick={() => navigate("/Interview_welcome_screen")}>Interview screen</Button>*/}

            </Drawer>
            {/* ---------//Sidebar------- */}
            <Divider />
            <Dashboard_footer />
        </>
    )
    /*  const [isOpen, setIsOpen] = useState(true);
      const toggle = () => setIsOpen(true);
      const { Recruiter } = useRecruiterContext()
      const menuItem = [
          {
              path: "/home",
              name: "Dashboard",
              icon: <ImHome />
          },
          {
              path: "/ActiveJobVacancyList",
              name: "Job Vacancies",
              icon: <HiOutlineUserGroup />
          },
          {
              path: "/PositionList",
              name: "Position",
              icon: <ImProfile />
          },
  
      ]
      return (
          <div className="container">
              <div style={{ width: isOpen ? "200px" : "50px" , borderRight: '1px solid lightgray'}} className="sidebar">
                  <div className="top_section">
                      {Recruiter && (<h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Hello,{Recruiter.RecName}</h1>)}
  
                      <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                      </div>
                  </div>
                  {
                      menuItem.map((item, index) => (
                          <NavLink to={item.path} key={index} className="link" activeclassName="active">
                              <div className="icon">{item.icon}</div>
                              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                          </NavLink>
                      ))
                  }
  
                     <Link to="/CreateJobbVacancy"><Button variant="contained" sx={{ margin: " 0 5px", backgroundColor: "#14359F" , width:"-10px" , height:"40px" , fontSize:"12px",cursor: "pointer"}} startIcon={<AddIcon />}>New Job Vacancy</Button> </Link>
              </div>
              <main>{children}</main>
          </div>
      );*/
};

export default Sidebar;