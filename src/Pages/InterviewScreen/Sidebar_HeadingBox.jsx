import React from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PinnaclLogo from '../../images/PinnacleLogo.png'

import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";




function Sidebar_HeadingBox(props) {


    const { VacancyID } = useParams();
    const { CandidateDocID } = useParams();
    const { CandidateID } = useParams();
    const { Recruiter } = useRecruiterContext()
    const [CandidateName, setCandidateName] = useState('')
    const [VacancyName, setVacancyName] = useState('')



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
    
                    }
    
    
    
                }
    
                )
            }
        }


        const fetchVacancyInfo = async () => {
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfo/' + VacancyID, {
            })
            const json = await response.json()
            if (response.ok) {
                console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
                setVacancyName(json.title)
               /* json.Candidate_Info && json.Candidate_Info.map((item, i) => {
                    console.log(`${item.id}`)
    
                    if (item.id == CandidateID) {
                        console.log("enetr the condition of welcome page retriveing")
                        console.log(item.Candidate_Name)
    
                        setCandidateName(item.Candidate_Name)
                    }
                }
                )*/
            }
        }


        if (!Recruiter ) {
            fetchPosition()
            fetchVacancyInfo()
        }
    }, [VacancyID, CandidateDocID, CandidateID]) 

    return (
        <>
            <Box component="div" className="site_logo">
                <img
                    src={PinnaclLogo}
                    // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={"header_img"}
                    loading="lazy"
                />
                <Typography variant='h5'>
                    Pinnacle
                </Typography>
            </Box>
            <Box component="div" className="condidate_name">
                <p className="name">Welcome, {CandidateName}!</p>
                <p className="position">{VacancyName}</p>

            </Box>
        </>
    )
}
export default Sidebar_HeadingBox;