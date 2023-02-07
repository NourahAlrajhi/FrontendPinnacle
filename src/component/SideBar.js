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
import CloseIcon from '@mui/icons-material/Close';
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

const StyledList = styled(List)({
    // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
        backgroundColor: ' rgb(233, 231, 231);',
        '&, & .MuiListItemIcon-root': {
            color: 'black',
            border: '6px'
        },
    },
    // hover states
    '& .MuiListItemButton-root:hover': {
        backgroundColor: ' rgb(233, 231, 231)',
        '&, & .MuiListItemIcon-root': {
            color: 'black',
            border: ' 6px'
        },
    },
});

const Sidebar = ({ children }) => {





    // ---------------setVlaue_local---------
    const activeKeyValue = localStorage.getItem("activeBtn_pinniacle")
    const setVlaue_local = (e) => {
        // ---first clear localstorage
        localStorage.setItem('activeBtn_pinniacle', '')
        // ---then set value in localstorage
        localStorage.setItem('activeBtn_pinniacle', `${e}`)
    }






    const { Recruiter } = useRecruiterContext()
    let RECRUITERNAME = `${Recruiter.RecName}`
    let index = RECRUITERNAME.indexOf(' ');
    if (index <= 0) {
        RECRUITERNAME = RECRUITERNAME

    } else {
        RECRUITERNAME = RECRUITERNAME.substring(0, index)
    }

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };
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
    const [submenuopen, setsubmenuclose] = React.useState("submenuShow");
    const subManuFun = () => {
        if (submenuopen == "submenuClose") {
            setsubmenuclose("submenuShow")
        } else {
            setsubmenuclose("submenuClose")
        }
    }
    // const subManuFunHide = () => {
    //     if (submenuopen == "submenuShow") {
    //         setsubmenuclose("submenuClose")
    //     }
    // }

    React.useEffect(() => {
        { activeKeyValue == "Open_Jop_Vacancies" || activeKeyValue == "Active_Job_Vacancies" || activeKeyValue == "Closed_Jop_Vacancies" ? setsubmenuclose("submenuShow") : setsubmenuclose("submenuClose") }
    }, [activeKeyValue])
    // ---create sub menu and pass in lists loop--
    const subManu = <List >
        <ListItem disablePadding sx={{ margin: "5px 0 0 0" }} onClick={() =>
            // ----set value localfun---
            setVlaue_local('Open_Jop_Vacancies')}>
            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main/Open_jop_vacancies_main" sx={{ padding: "2px 10px", borderRadius: "8px" }} className={activeKeyValue == "Open_Jop_Vacancies" ? "said_bar_list_active" : ""}>
                <ListItemText primary="Open Jop Vacancies" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ margin: "5px 0 0 0" }} onClick={() =>
            // ----set value localfun---
            setVlaue_local('Active_Job_Vacancies')}>

            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main" sx={{ padding: "2px 10px", borderRadius: "8px" }} className={activeKeyValue == "Active_Job_Vacancies" ? "said_bar_list_active" : ""}>
                <ListItemText primary="Active Job Vacancies" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ margin: "5px 0 0 0" }} onClick={() =>
            // ----set value localfun---
            setVlaue_local('Closed_Jop_Vacancies')}>
            <ListItemButton component="a" href="/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main" sx={{ padding: "2px 10px", borderRadius: "8px" }} className={activeKeyValue == "Closed_Jop_Vacancies" ? "said_bar_list_active" : ""}>
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
                        <Typography style={{ margin: "1px", fontSize: "22px" }} fontWeight={700}>
                            Pinnacle
                        </Typography>
                    </Box>
                </DrawerHeader>
                {/* <Divider /> */}
                {/* ---name--- */}
                <Typography textAlign="left" padding="20px 0 0 20px" overflow='hidden' textOverflow='ellipsis' style={{ fontSize: "22px" }} fontWeight={700}>
                    Hello, {RECRUITERNAME}
                </Typography>
                {/* ---- */}
                <StyledList>
                    {[/*{ name: 'Dashboard', urlLink: "/home" },*/ { name: 'Job Vacancies', subManu: subManu, subManuFunA: subManuFun, }, { name: 'Positions', urlLink: "/PositionList", setVlaue_localA: setVlaue_local }].map((text, index) => (
                        <ListItem key={index} sx={{ display: 'block', overflow: "hidden", fontSize: "22px", fontWeight: "700" }} onClick={() => {
                            navigate(text.urlLink)
                            text.subManuFunA()
                        }}   >
                            <ListItemButton
                                sx={{
                                    minHeight: 38,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1.5,
                                }}
                                selected={index === 0 ? selectedIndex === null : selectedIndex === 1}
                                onClick={() => {
                                    handleListItemClick(index === 0 ? 0 : 1)
                                    text.setVlaue_localA("")
                                }}

                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 0.9 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 ? <HiOutlineUserGroup /> : <ImProfile />}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 5 : 0 }} />
                            </ListItemButton>

                            <Box className={submenuopen} sx={{ marginLeft: "0px" }} >
                                {text.subManu}
                            </Box>
                        </ListItem>
                    ))}
                </StyledList>


                {activeKeyValue == "new_job_vancancy" ? <Button variant="contained" className="activeSideBar_btn " sx={{ margin: " 0 10px", backgroundColor: "#14359F" }} startIcon={<CloseIcon sx={{ fontSize: "3rem" }} />}>New Job Vacancy</Button> : [open ? <Button variant="contained" sx={{ margin: " 0 10px", backgroundColor: "#14359F" }} startIcon={<AddIcon />} onClick={() => {
                    navigate("/CreateJobbVacancy")
                    // ----set value localfun---
                    setVlaue_local('new_job_vancancy')
                    setSelectedIndex(0)

                }} className="hoverButton">New Job Vacancy</Button> : <Button variant="contained" sx={{ margin: " 0 10px", backgroundColor: "#14359F", width: "50px", minWidth: "auto" }} startIcon={<AddIcon />}></Button>]}



                {/* --demo button for show interview screen-- */}
                {/* <Button variant="contained" sx={{ margin: " 20px 10px", backgroundColor: "gray" }} onClick={() => navigate("/Interview_welcome_screen")}>Interview screen</Button>*/}

            </Drawer>
            {/* ---------//Sidebar------- */}
            <Divider />
            <Dashboard_footer width={drawerWidth} />
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