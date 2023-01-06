import { Link, useParams } from 'react-router-dom'

import { useLogout } from '../Hook/useLogout'
import { useLocation } from 'react-router-dom';
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import PinnaclLogo from '../images/PinnacleLogo.png'
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';

import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
// icons--
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = (props) => {
  let navigate = useNavigate();
  const { logout } = useLogout()
  const { Recruiter } = useRecruiterContext()
  const [VacancyName, setVacancyName] = useState('')
  let myString;
  const handleClick = () => {
    logout()
    navigate(`/`);

  }
  const { id } = useParams();
  const { id3 } = useParams();
  const { id2 } = useParams();

  let { Name } = useParams();
  console.log(id)
  console.log(Name)
  if(Name!= null){
    myString='';
   myString = Name;
  myString = myString.replace(/\s+/g, '%20');

  Name=Name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
 

  console.log(myString);
  }
  /* const JobVacancyName = async () => {
 
       const response = await fetch('/api/Candidate/VacancyName/'+ id, {
           headers: { 'Authorization': `Bearer ${Recruiter.token}` },
       })
       const json = await response.json()
       if (response.ok) {
         setVacancyName(json.title)
           console.log("===========")
           console.log(VacancyName)
           console.log("===========")
          
 return VacancyName
       }
   
 
   }
   if (Recruiter) {
     JobVacancyName()
     }*/

  const NAVBAR_TEXTS = [{ page: "/PositionList", text: "Positions" }, { page: "/", text: "Login" }, { page: `/PositionDetails2/${id}`, text: "View Position Details" }, { page: "/PositionForm", text: "Create New Position" }, { page: "/home", text: "Dashboard" }, { page: `/EditPosition/${id}`, text: "Edit Position Details" }, { page: "/CreateJobbVacancy", text: "New Job Vacancy" }, { page: "/Dashboard/View_job_vacancy_main", text: "Active Job Vacancies" }, { page: `/Dashboard/View_job_vacancy_main/Candidates_results_main/${id}/${myString}`, text: Name }, { page: `/Dashboard/View_job_vacancy_main/Candidates_results_main/Interview_result/${id3}/${id2}`, text: " Candidate Interview Results" }, { page: "/Dashboard/View_job_vacancy_main/Open_jop_vacancies_main", text: "Open Job Vacancies" }, { page: "/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main", text: "Closed Job Vacancies" }]
  console.log(`!!!!!!!!!!/PositionDetails2/${id}`)
  const location = useLocation();

  const textToShow = NAVBAR_TEXTS.find(el => el.page === location.pathname)?.text
  /*return (

    <header >
      <div className="container" style={{ borderBottom: '1px solid lightgray' }} >
        <Link to="/">
          <div className='logoname'>
            <img alt="PinnaclLogo" className="photo" src={PinnaclLogo} />
            <h2 style={{ margin: "5px" }}>Pinnacle</h2>
          </div>
        </Link>
        <h3>{textToShow}</h3>
        <nav >
          {Recruiter && (
            <div>


              <a onClick={handleClick}> <FiLogOut /></a>
            </div>
          )}
          {!Recruiter && (
            <div>
              <Link to="/">Login</Link>
            </div>

          )}


        </nav>
      </div>
    </header>
  )*/
  return (
    <>
      <props.AppBarC position="fixed" sx={{ backgroundColor: "white", color: "#222", boxShadow: "none", borderBottom: "1px solid lightgray" }} open={props.openC}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label=" drawer"
            onClick={props.handleDrawerOpenC}
            edge="start"
            sx={{
              marginRight: 5,
              ...(props.openC && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="div" flexGrow={1} textAlign="center" style={{ fontSize: "22px" }} >
            {textToShow}
          </Typography>
          <nav >
            {Recruiter && (
              <div>


                <a onClick={handleClick}> <FiLogOut /></a>
              </div>
            )}
            {!Recruiter && (
              <div>
                <Link to="/">Login</Link>
              </div>

            )}


          </nav>
        </Toolbar>
      </props.AppBarC>
    </>
  )
}

export default Navbar