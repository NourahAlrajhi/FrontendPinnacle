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
import { useCallback } from "react";


function Question_screen(props) {

  // ----------popover function----
  const [anchorEl, setAnchorEl] = React.useState(null);





  const { VacancyID } = useParams();
  const { CandidateDocID } = useParams();
  const { CandidateID } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [CandidateName, setCandidateName] = useState('')




  useEffect(() => {

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
    if (!Recruiter) {
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
  var FinishFirstQuestion = false
  const webRef = useRef(null)

  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true); // set the initial state to true
  //const [recordingForFullInterview, setrecordingForFullInterview] = useState(false);
  //const [streamForFullInterview, setstreamForFullInterview] = useState(null);
  //const [recordedVideosForFullInterview, setrecordedVideosForFullInterview] = useState([]);


  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  let [ArrayOfBlob, setArrayOfBlob] = useState([])
  let [j, setj] = useState(0)

  console.log(webRef.current)


  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },


  };

/////////

  const handleStartRecording = async() => {
   
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        streamRef.current = stream;
        const recordedVideo = new MediaRecorder(stream);
        recordedVideo.start();
        setRecordedVideos([...recordedVideos, recordedVideo]);
    } catch (error) {
        console.error("Error: ", error);
        alert("Please grant permission to use the camera and microphone");
    }}
  


  /*const handleStartRecordingForFullInterview = () => {
    console.log("Enter the handleStartRecordingForFullInterview")
    setrecordingForFullInterview(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        setstreamForFullInterview(stream);
        const recordedVideosForFullInterview = new MediaRecorder(stream);
        recordedVideosForFullInterview.start();
        setrecordedVideosForFullInterview([...recordedVideosForFullInterview, recordedVideosForFullInterview]);
      })
      .catch(error => {
        console.error(error);
      });
  };*/



  /*const handleSendVideosForFullInterview = () => {
    console.log("Enter the handleSendVideosForFullInterview")

    const videoBlob = new Blob(recordedVideosForFullInterview
      , { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);
    const video = document.createElement('video');
    video.src = videoUrl
    video.controls = true;
    document.body.appendChild(video);

    const formData = new FormData();
    formData.append('FullCandidateInterview', videoBlob);
    console.log("lllllllllllllllll")
    console.log(videoBlob)
    console.log("lllllllllllllllll")
    fetch('/api/Recruiter/InterviewFullVideo/' + CandidateDocID + '/' + CandidateID, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);

      })
      .catch(error => {
        console.error(error);
      });


    recordedVideosForFullInterview.stop();


    setrecordedVideosForFullInterview([]);

  }*/



  const handleStopRecording= () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }


  const handleCutAndStartOver = () => {
    console.log("Enter the handleCutAndStartOver")

    handleStopRecording();
    handleStartRecording();
  };

  const handleSendVideos = () => {
    console.log("Enter the handleSendVideos")
    recordedVideos.forEach(recordedVideo => {
      recordedVideo.ondataavailable = e => {
        const videoBlob = new Blob([e.data], { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        const video = document.createElement('video');
        video.src = videoUrl
        video.controls = true;
        document.body.appendChild(video);

        const formData = new FormData();
        formData.append('CandidateInterview', videoBlob);
        console.log("lllllllllllllllll")
        console.log(videoBlob)
        console.log("lllllllllllllllll")
        fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/InterviewVideo/' + CandidateDocID + '/' + CandidateID, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {

            console.log(data);

          })
          .catch(error => {
            console.error(error);
          });
      }

      recordedVideo.stop();
    });

    setRecordedVideos([]);

  }


  useEffect(() => {

    if (isRecording) {
    handleStartRecording()
    }
      // cleanup function
      return () => {
        handleStopRecording();
      };
  }, [isRecording])


  useEffect(() => {
    if(props.activeStep === props.steps.length ) {
      setIsRecording(false); // change the state to stop the recording
        alert('Thank you for visiting our website, your Interview has been recorded')
    }
  }, [props.activeStep ])

  return (
    <>
     
      <Container maxWidth="lg" sx={{ overflow: "auto" }}>
        {props.activeStep === props.steps.length ? (
          <box component="div" className="thanksScreen">
            All Done
            Thank You For Your Time, {CandidateName}!
            <box component="div" className="thanksScreen">
              <Button variant="contained" onClick={ handleSendVideos} sx={{ padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "#14359F" } }}>{"Click Here To Finish The Interview"}</Button>     </box>
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
                <Webcam audio={true} imageSmoothing={true} mirrored={true} ref={webRef} className="camraField" videoConstraints={videoConstraints} muted="muted" />
              </Box>
              {/* -----//camra div---- */}

              {/* -----PodcastsOutlinedIcon button----- */}
              <PodcastsOutlinedIcon className="PodcastsIcon" />
            </Box>
            {/* -----next question button----- */}
            <Box component="div" className="nextQuestionBtn">


              {/* onClick={handleDownload}*/}
              <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />} onClick={() => { props.handleNext(); handleCutAndStartOver() }} className="button_next">
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