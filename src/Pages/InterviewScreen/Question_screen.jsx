import React from "react";
import { Box } from "@mui/system";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Container from '@mui/material/Container';
import Common_button from "../Common_button";
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
// ------web camp---
import Webcam from "react-webcam";
import { useRef } from "react";


function Question_screen(props) {

  // ----------popover function----
  const [anchorEl, setAnchorEl] = React.useState(null);




  
  const { VacancyID } = useParams();
  const { CandidateDocID } = useParams();
  const { CandidateID } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [CandidateName, setCandidateName] = useState('')



  useEffect(() => {
      //console.log("formRows: ", consumer);
      const fetchPosition = async () => {
          const response = await fetch('/api/Recruiter/WelcomeInterviewPageForeCandidate/' + CandidateDocID, {
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
      if (!Recruiter ) {
          fetchPosition()
      }
  }, [VacancyID, CandidateDocID, CandidateID]) 


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // ----

  // --------web camp ----

  const webRef = useRef(null)
  console.log(webRef.current)

  return (
    <>

      <Container maxWidth="lg" sx={{ overflow: "auto" }}>
        {props.activeStep === props.steps.length ? (

          <box component="div" className="thanksScreen">
            All Done
            Thank You For Your Time, {CandidateName}!
          </box>

        ) : (

          <>
            <p className="question_heading">{props.questionHeading}</p>
            <Box component="div" className="camra_div">
              {/* ----popover button--- */}
              <div className="buttonDiv">
                <Button aria-describedby={id} variant="contained" onClick={handleClick} className="Dot_button">
                  <MoreHorizOutlinedIcon />
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
              </div>
              {/* ----//popover button--- */}
              {/* -----camra div---- */}
              <Box component="div" className="webCamp">
                <Webcam ref={webRef} className="camraField" />
              </Box>
              {/* -----//camra div---- */}

              {/* -----PodcastsOutlinedIcon button----- */}
              <PodcastsOutlinedIcon className="PodcastsIcon" />
            </Box>
            {/* -----next question button----- */}
            <Box component="div" className="nextQuestionBtn">

              <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />} onClick={props.handleNext} className="button_next">
                Move To Next Question
              </Button>

            </Box>
          </>
        )}
      </Container>
    </>
  )
}

export default Question_screen;