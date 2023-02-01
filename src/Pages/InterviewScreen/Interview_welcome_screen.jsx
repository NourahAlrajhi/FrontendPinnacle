import * as React from 'react';
import Box from '@mui/material/Box';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Common_button from '../Common_button';
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";

// import { useNavigate } from 'react-router';
// ------web camp---
import Webcam from "react-webcam";
import { useRef } from "react";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import PinnaclLogo from '../../images/PinnacleLogo.png'
import { useParams } from "react-router-dom";

import './Interview.css'





function Interview_welcome_screen() {

    const [VacancyTime, setVacancyTime] = useState('')

    const { VacancyID } = useParams();
    const { CandidateDocID } = useParams();
    const { CandidateID } = useParams();
    const { Recruiter } = useRecruiterContext()

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [CandidateName, setCandidateName] = useState('')
    const [FinishDuration, setFinishDuration] = useState(false)
    const [FinishInterview, setFinishInterview] = useState(false)
    const [QUESTIONS, setQUESTIONS] = useState([{}])
    const [FinisHALFhInterview, setFinisHALFhInterview] = useState(false)



    useEffect(() => {
        //console.log("formRows: ", consumer);
        const fetchPosition = async () => {
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/WelcomeInterviewPageForeCandidate/' + CandidateDocID, {
            })
            const json = await response.json()
            if (response.ok) {
                console.log("Enter welcome page retriveing")
                json.Candidate_Info && json.Candidate_Info.map((item, i) => {
                    console.log(`${item.id}`)

                    if (item.id == CandidateID) {
                        console.log("enetr the condition of welcome page retriveing")
                        console.log(item.Candidate_Name)

                        setCandidateName(item.Candidate_Name)
                        setFinisHALFhInterview(item.IsStartingTheInterview)
                        if (item.RECORDS.length > 1) {
                            setFinishInterview(true)
                        }

                        /* const responsee = fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfoForeQuestion/' + VacancyID, {
                         })
                         const jsonn = responsee.json()
                         if (response.ok) {
                             console.log("Enter To See if candidate is not complete the interview")
                             console.log(jsonn.Position)
                             jsonn.Position && jsonn.Position.map((item2, i) => {
                                 setQUESTIONS(item2.arr)
                                 if (item2.arr.length != item.RECORDS.length) {
                                     setFinisHALFhInterview(true)
 
                                     //Delet The Record For This Interview Here
                                 }
 
                             })
                         }*/

                    }




                }

                )
            }
        }


        const fetchVacancyInfo = async () => {
            let currentDate = new Date().toISOString()
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfo/' + VacancyID, {
            })
            const json = await response.json()
            if (response.ok) {
                console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
                setVacancyTime(json.status)
                console.log(json.status)


                if (json.status == "Closed") {
                    setFinishDuration(true)

                }


            }
        }

        /* const fetchVacancyInfo2 = async () => {
             const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfoForeQuestion/' + VacancyID, {
             })
             const json = await response.json()
             if (response.ok) {
                 console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
                 console.log(json.Position)
                 json.Position && json.Position.map((item, i) => {
                     setQUESTIONS(item.arr)
                     if (item.arr.length !=) 
       
               })
             }
         }*/


        if (!Recruiter) {
            fetchPosition()
            fetchVacancyInfo()
            //  fetchVacancyInfo2()
        }
    }, [VacancyID, CandidateDocID, CandidateID])

    // ------emailfiled empty Remove--------

    const [emailfiled, setemailfiled] = React.useState("");
    const inputValue = (e) => {
        setemailfiled(e.target.value)
        console.log(emailfiled)
    }
    const inputEmpatyBtn = () => {
        setemailfiled("")
    }
    // --------web camp ----
    const webRef = useRef(null)
    console.log(webRef.current)
    // -navigate----
    let navigate = useNavigate()



    const SetIsEnterToInterview = async () => {
        //https://backend-pinnacle.herokuapp.com/
        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/SetIsEnterToInterview/' + CandidateDocID + '/' + CandidateID, {
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Enter SetIsEnterToInterviewnnnnnnnnnnnnnnnnnnnnnnnnn")
        }
    }


    return (

        <>
            <section className='Interview_section'>
                <div className='main_div'>
                    {/* ------form div--------- */}
                    <div className='BoxDiv'>
                        <div className='frame'>

                            {/* heading */}
                            <div className='name_heading'>
                                <img src={PinnaclLogo} alt="#" />
                                <p className='from_heading'>Pinnacle</p>
                            </div>

                            {/* ---inputs--- */}
                            <div className='content'>
                                <p className='heading'> Welcome {CandidateName}!</p>
                                {!FinishDuration && !FinishInterview && !FinisHALFhInterview ? <p className='pera'>Make Sure Your Microphone and Camera Before Sarting the Interview!</p> : FinishDuration ? <p className='pera' style={{ padding: "40px", textAlign: "center", color: "red" }}>This Interview Link is Expired</p> : FinishInterview ? <p className='pera' style={{ padding: "40px", textAlign: "center", color: "red" }}>You Already Finish The Interview</p> : <p className='pera' style={{ padding: "40px", textAlign: "center", color: "red" }}>You Already Entered The interview Before and did not complete it!</p>}
                                {!FinishDuration && !FinishInterview && !FinisHALFhInterview ? <div className='filds'>
                                    {/* ----camra div----- */}

                                    <Box component="div" className='camraViewDiv'>
                                        {/* <img src="https://picsum.photos/200/300" alt="#" /> */}
                                        <Webcam audio={false} imageSmoothing={true} mirrored={true} ref={webRef} className="camraField" />
                                    </Box>
                                    {/* ----//camra div------ */}
                                    {/* ----mick div------ */}
                                    <Box component="div" className='microPhone'>
                                        <KeyboardVoiceOutlinedIcon className='microIcon' />
                                    </Box>
                                    {/* ----//mick div------ */}
                                    {/* -----setUpLine ---- */}
                                    <Box component="div" className='setUpLine'>
                                        <p className="doneIcon">
                                            <DoneOutlinedIcon />
                                        </p>
                                        <hr />
                                        <p >All Set Up</p>
                                    </Box>
                                    {/* -----//setUpLine---- */}
                                </div> : FinishDuration ? <h2 style={{ padding: "40px", textAlign: "center" }}>See you next Time , and be carfull with your appointment!</h2> : FinishInterview ? <h2 style={{ padding: "40px", textAlign: "center" }}>Wait For your Result</h2> : <h2 style={{ padding: "40px", textAlign: "center" }}>Please contact with our help desk team to fix your problem</h2>}
                            </div>
                            {/* ---//inputs--- */}
                        </div>
                        {/* ----start button---- */}
                        <Box component="div" className="startButton"  >

                            {/* <NavLink style={{ textDecoration: "none" }} >*/}

                            {!FinishDuration && !FinishInterview && !FinisHALFhInterview ? <Button variant="contained" sx={{ padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "#14359F" } }} onClick={() => { navigate(`/Question_interview/${VacancyID}/${CandidateDocID}/${CandidateID}`); SetIsEnterToInterview() }}>{"Start Interview"}</Button> : <Button variant="contained" sx={{ padding: "0.5rem 2rem", background: "gray", borderRadius: "8px", "&:hover": { background: "gray", color: "white" } }} >{"Start Interview"}</Button>}

                            {/* <Common_button btnText={"Start Interview"}  />*/}
                            {/*  </NavLink>*/}
                        </Box>
                        {/* ----//start button---- */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Interview_welcome_screen