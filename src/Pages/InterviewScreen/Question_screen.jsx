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
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Paper from '@mui/material/Paper';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import WarningIcon from '@material-ui/icons/Warning';
import {CiWarning }  from "react-icons/ci";
import {TiWarningOutline}  from "react-icons/ti";
import {BsCheck2} from "react-icons/bs";
import {VscWarning} from "react-icons/vsc";
function Question_screen(props) {

  // ----------popover function----
  const [anchorEl, setAnchorEl] = React.useState(null);




  const navigate = useNavigate();
  //const cors = require('cors'); 
  const { VacancyID } = useParams();
  const { CandidateDocID } = useParams();
  const { CandidateID } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [CandidateName, setCandidateName] = useState('')
  const [VacancyQuestion, setVacancyQuestion] = useState([{}])
  const [QUESTIONS, setQUESTIONS] = useState([{}])
  const [InterviewedCandidates, setInterviewedCandidates] = useState(0)
  const [FinisHALFhInterview, setFinisHALFhInterview] = useState(false)
  const [FinishInterview, setFinishInterview] = useState(false)
  const [isRecording, setIsRecording] = useState(true); // set the initial state to true
  const [IsBeingRecordTheFirstEnternce, setIsBeingRecordTheFirstEnternce] = useState(true); // set the initial state to true
  const [EnterIncremntOnce, setEnterIncremntOnce] = useState(true); // set the initial state to true
  const [RECORDLIST, setRECORDLIST] = useState([{}])
  const [steps, setsteps] = useState([''])
  const [stepsForImportance, setstepsForImportance] = useState([''])
  const [stepsForQuestionId, setstepsForQuestionId] = useState([''])
  const [stepsForRecords, setstepsForRecords] = useState([{}])
const [SubmitTheinterview,setSubmitTheinterview]=useState(false)
const [SetCandidateINFOOO, setSetCandidateINFOOO] = useState([{}])



  let count = 0;



  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.onpopstate = () => {
      handleStopRecording();
    }
    // window.addEventListener('unload', handleTabClosing)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      // window.removeEventListener('unload', handleTabClosing)
      // handleTabClosing()
    }
  }, [])

  const handleTabClosing = () => {
   // handleSendVideos()
   handleStopRecording()
  }

  const alertUser = (event: any) => {
    event.preventDefault()
    event.returnValue = 'Are you sure you want to close?'

  }



  useEffect(() => {

    const fetchPosition = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/WelcomeInterviewPageForeCandidate/' + CandidateDocID, {
      })
      const json = await response.json()
      if (response.ok) {
        console.log("Enter welcome page retriveing")
        setSetCandidateINFOOO(json.Candidate_Info)
        json.Candidate_Info && json.Candidate_Info.map((item, i) => {
          console.log(`${item.id}`)

          if (item.id == CandidateID) {
            console.log("enetr the condition of welcome page retriveing")
            console.log(item.Candidate_Name)
            // setFinisHALFhInterview(item.IsStartingTheInterview)
           
            setCandidateName(item.Candidate_Name)
            setCandidateName(item.Candidate_Name)
            setSubmitTheinterview(item.SubmitTheinterview)
            //  setFinisHALFhInterview(item.IsStartingTheInterview)
            if (item.RECORDS.length > 1) {
              setFinishInterview(true)
              setCloseTheTimer(true)
            } else if (count === 0) {
              handleStartRecording()
              count += 2
              setIsBeingRecordTheFirstEnternce(false)
            }
          }



        }

        )
      }
    }
    if (!Recruiter) {
      fetchPosition()
    }
  }, [VacancyID, CandidateDocID, CandidateID, isRecording])





  useEffect(() => {
    //console.log("formRows: ", consumer);


    const fetchVacancyInfo = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfoForeQuestion/' + VacancyID, {
      })
      const json = await response.json()
      if (response.ok) {
        console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
        setVacancyQuestion(json.Position)
        console.log(json.Position)


        json.Position && json.Position.map((item, i) => {
          setQUESTIONS(item.arr)

          console.log(item.arr)

        })
      }
    }


    const fetchVacancyInfo2 = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfo/' + VacancyID, {
      })
      const json = await response.json()
      if (response.ok) {

        setInterviewedCandidates(json.InterviewedCandidates)
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        console.log(json.InterviewedCandidates)
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")


      }
    }


    if (!Recruiter) {

      fetchVacancyInfo()
      fetchVacancyInfo2()
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
  const recordedVideo = null
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const streamRef = useRef(null);
  //const [recordingForFullInterview, setrecordingForFullInterview] = useState(false);
  //const [streamForFullInterview, setstreamForFullInterview] = useState(null);
  //const [recordedVideosForFullInterview, setrecordedVideosForFullInterview] = useState([]);
  const [seconds, setSeconds] = useState(20)
  const [minutes, setMinutes] = useState(8)
  const [CloseTheTimer, setCloseTheTimer] = useState(false);

  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  let [ArrayOfBlob, setArrayOfBlob] = useState([])
  let [j, setj] = useState(0)
  const [CLICKSENDTOMODEL, setCLICKSENDTOMODEL] = useState(false);
  const [ButtonAppearnce, setButtonAppearnce] = useState(false);


  function handleTests2(index) {
    let updateData = SetCandidateINFOOO.map((item, i) => {
      return item.id == CandidateID ? { ...item, SubmitTheinterview: !item.SubmitTheinterview } : item;
    });
    setSetCandidateINFOOO(updateData);
  }


  console.log(webRef.current)


  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },


  };


  function updateTime() {
    if (!CloseTheTimer) {
      if (minutes == 0 && seconds == 0) {
        //alert('The Time For This Question is Finish Please Move To The Next Question')
        handleCutAndStartOverWhenTimerIsOut()
        //reset
        // setSeconds(0);
        // setMinutes(20);
      }
      else {
        if (seconds == 0) {
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }

    }

  }

  function updateTimeWhenClickNext() {

    //reset
    setSeconds(20);
    setMinutes(8);


  }

  useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }
  })

  /////////

  const handleStartRecording = async () => {
    console.log("Enter220000000000222222222000000000002222222222200000000222222")

    if (props.activeStep === props.steps.length) {
      handleStopRecording()
    } else {

      console.log(isRecording)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        streamRef.current = stream;
        const recordedVideo = new MediaRecorder(stream);
        recordedVideo.start();
        setRecordedVideos([...recordedVideos, recordedVideo]);
        //localStorage.setItem("recordedVideos", [...recordedVideos, recordedVideo] );

      } catch (error) {
        console.error("Error: ", error);
        // alert("Please grant permission to use the camera and microphone");

        confirmAlert({
          // ----change ui---
          customUI: ({ onClose }) => {
            return (
    
              <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
                {/* <h3>Confirmation Message</h3> */}
    
                <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><VscWarning size={35} style={{ color: "#7024C4", margin: "-13px" }} /> &nbsp; Please grant permission to use the camera and microphone</p>
              </div>
            )
          }
          // ----//change ui---
    
        })
      }

    }
  }

  // stop both mic and camera
  function stopBothVideoAndAudio() {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")

    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    stream.getTracks().forEach(function (track) {
      console.log("enter trackkkkkkkk")
      track.stop();
    });





  }



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



  const handleStopRecording = () => {
    console.log("Enter11100000000001111110000000000011111110000000011111")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log(track)
        track.stop()
      });
      setStream(null);
    }

  }

  const handleCutAndStartOverWhenTimerIsOut = () => {
    console.log("Enter the handleCutAndStartOverWhenTimerIsOut")
    // alert('The Time For This Question is Finish, You Will Be Move To The Next Question')

    confirmAlert({
      // ----change ui---
      customUI: ({ onClose }) => {
        return (

          <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
            {/* <h3>Confirmation Message</h3> */}

            <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><VscWarning size={35} style={{ color: "#7024C4", margin: "-13px" }} /> &nbsp; The Time For This Question is Finish, You Will Be Move To The Next Question</p>
          </div>
        )
      }
      // ----//change ui---

    })

    props.handleNext();
    {
      props.activeStep + 1 === props.steps.length ? handleSendVideos()
        //navigate("/");
        :

        handleCutAndStartOver();
      /* handleCutAndStartOver()*/
    }
    setSeconds(20);
    setMinutes(8);
    //  handleStopRecording();
    //  handleStartRecording();


  };

  const handleCutAndStartOver = () => {
    console.log("Enter the handleCutAndStartOver")

    handleStopRecording();
    handleStartRecording();
    updateTimeWhenClickNext()

  };
  //http://localhost:3000/Interview_welcome_screen/63c7cc4d3f84630d6c1671e0/63c7cc4e3f84630d6c1671e5/391b2464-a9ee-4bfa-abaf-7d169c144ede
  const handleSendVideos = () => {
    handleStopRecording()
    setCloseTheTimer(true)
    console.log("Enter the handleSendVideos")
    console.log("Enter the handleSendVideos Whennnnn User Close Th siteeee")

    recordedVideos.forEach((recordedVideo, index) => {

      recordedVideo.ondataavailable = (e) => {
        const videoBlob = new Blob([e.data], { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        const video = document.createElement('video');
        video.src = videoUrl
        video.controls = true;
        document.body.appendChild(video);

        console.log(QUESTIONS[index].id)

        const formData = new FormData();
        formData.append('CandidateInterview', videoBlob);
        console.log("lllllllllllllllll")
        console.log(videoBlob)
        console.log("lllllllllllllllll")
        //https://backend-pinnacle.herokuapp.com/
        fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/InterviewVideo/' + CandidateDocID + '/' + CandidateID + '/' + QUESTIONS[index].id + '/' + VacancyID + '/' + InterviewedCandidates, {
          method: 'POST',
          body: formData
        })

          .then(data => {

            console.log(data);

          })
          .catch(error => {
            console.error(error);
          });
      }



      recordedVideo.stop();
    })


    handleIncremntNumber()


    setRecordedVideos([]);
    // CallingTheModel()
    // RecrodsArrayForTheModel()
  }


  const handleIncremntNumber = async (e) => {

    console.log("Enter beginingggggg handleIncremntNumber")
    //https://backend-pinnacle.herokuapp.com/
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/IncremntInterviewdCandidate/' + CandidateDocID + '/' + CandidateID + '/' + VacancyID + '/' + InterviewedCandidates, {
      method: 'POST',
    })
    const json = await response.json()
    if (response.ok) {
      console.log("Increment Sucessfully!!!!")

    }
    // CallingTheModel()

  }


  // setTimeout(()=>{
  //   RecrodsArrayForTheModel()
  // },30000)

  const RecrodsArrayForTheModel = async (e) => {
    //https://backend-pinnacle.herokuapp.com/
    setCLICKSENDTOMODEL(true)
    setButtonAppearnce(true)
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/WelcomeInterviewPageForeCandidate/' + CandidateDocID, {
    })
    const json = await response.json()
    if (response.ok) {
      console.log("Enter welcome page retriveing")
      json.Candidate_Info && json.Candidate_Info.map(async (item, i) => {
        console.log(`${item.id}`)

        if (item.id == CandidateID) {
          console.log(item.RECORDS)


          const MODEL = { steps, stepsForImportance, RECORDLISTTT: item.RECORDS, stepsForQuestionId }
          //https://backend-pinnacle.herokuapp.com/
          const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/SendingDataToModel/' + CandidateDocID + '/' + CandidateID, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(MODEL)
          })
          const json = await response.json()
          if (response.ok) {
            console.log("Sent To The Model sucssfully")
          }
          setRECORDLIST(item.RECORDS)

        }
      })
      //  CallingTheModel()


    }
  }


  const showAlertSuccess = () => {
    var msg = parse('<h3 style="text-align: center">The interview ended successfully</h3>')
    // confirmAlert({
    //   message: msg,
    //   buttons: []
    // })
    confirmAlert({
      // ----change ui---
      customUI: ({ onClose }) => {
        return (

          <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
            {/* <h3>Confirmation Message</h3> */}

            <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><BsCheck2 size={35} style={{ color: "#A1E3CB", margin: "-13px" }} /> &nbsp; The Interview Ended Successfully</p>
          </div>
        )
      }
      // ----//change ui---

    })
  }

  const CallingTheModel = async (e) => {
    setCLICKSENDTOMODEL(true)
    setButtonAppearnce(true)
    showAlertSuccess()
    setTimeout(async () => {
      console.log("Enter beginingggggg CallingTheModel")
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfoForeQuestion/' + VacancyID, {
      })
      const json = await response.json()
      if (response.ok) {
        json.Position && json.Position.map((item, i) => {
          var j = 0
          item.arr && item.arr.map((itemmmms, x) => {
            console.log(`${itemmmms.questions}`)
            steps[j] = itemmmms.expectedAnswers
            stepsForImportance[j] = itemmmms.imprtanceOfQ
            stepsForQuestionId[j] = itemmmms.id
            j = x + 1
          })
          console.log("[FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF]")
          console.log(steps)
          console.log("[FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF]")
          setsteps(steps)
          setstepsForImportance(stepsForImportance)
          console.log("[aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa]")
          console.log(stepsForImportance)
          console.log("[aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa]")
        })


        RecrodsArrayForTheModel()

      }
    }, 40000)
  }

  const PassingToTheModel = async (e) => {
   
 //https://backend-pinnacle.herokuapp.com
 const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/SetIsSubmitEnterview/' + CandidateDocID + '/' + CandidateID, {
})


CallingTheModel()

  }


  /*useEffect(() => {

    if (!FinishInterview) {
      console.log("111111111100000000--------")
      handleStartRecording()


    }


    // cleanup function

  }, [/*isRecording*///props.activeStep])


  useEffect(() => {
    if (props.activeStep === props.steps.length) {
      //  handleStopRecording()
      setIsRecording(false); // change the state to stop the recording
      // alert('Thank you for visiting our website, your Interview has been recorded')

    }
  }, [props.activeStep])

  return (
    <>

      <Container maxWidth="lg" sx={{ overflow: "auto", marginTop: "0px" }}>
        {props.activeStep === props.steps.length ? (
          
          <box component="div" className="thanksScreen">
            {ButtonAppearnce?     <box component="div" className="thanksScreen">
            All Done
            Thank You For Your Time, {CandidateName}!{console.log(isRecording)}
            </box> :null}
           

            {!ButtonAppearnce ? <box component="div" className="thanksScreen" >
              <Button variant="contained" disabled={CLICKSENDTOMODEL} onClick={PassingToTheModel} sx={!CLICKSENDTOMODEL ? {padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "#1F278B", color: "white" } } : { padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "gray" } }}>{"Click Here To Finish The Interview"}</Button>     </box> : null}

          </box>

        ) : !FinishInterview ?

          <>
            <Button variant="contained" sx={{ padding: "0.5rem 2rem", marginLeft: "860px", position: "absolute", top: "20px", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "#14359F" } }}><p>
              timer: {minutes}:{seconds}
            </p></Button>
            <p className="question_heading" sx={{ overflow: "auto", marginTop: "1px" }}>{props.questionHeading}</p>
            <Box component="div" className="camra_div" sx={{ overflow: "auto", marginTop: "1px" }}>
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
              <Box component="div" className="webCamp" >
                <Webcam audio={true} imageSmoothing={true} mirrored={true} ref={webRef} className="camraField" videoConstraints={videoConstraints} muted="muted" />
              </Box>
              {/* -----//camra div---- */}

              {/* -----PodcastsOutlinedIcon button----- */}
              <PodcastsOutlinedIcon className="PodcastsIcon" />
            </Box>
            {/* -----next question button----- */}
            <Box component="div" className="nextQuestionBtn">


              {/* onClick={handleDownload}*/}
              <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />} onClick={() => {
                props.handleNext();
                {
                  props.activeStep + 1 === props.steps.length ? handleSendVideos()
                    //navigate("/");
                    :

                    handleCutAndStartOver();
                  /* handleCutAndStartOver()*/
                }
              }} className="button_next">
                Move To Next Question
              </Button>


            </Box>
          </>
          : !SubmitTheinterview?
          <box component="div" className="thanksScreen">
          {ButtonAppearnce?     <box component="div" className="thanksScreen">
          All Done
          Thank You For Your Time, {CandidateName}!{console.log(isRecording)}
          </box> :null}
         

          {!ButtonAppearnce ? <box component="div" className="thanksScreen" >
            <Button variant="contained" disabled={CLICKSENDTOMODEL} onClick={PassingToTheModel} sx={!CLICKSENDTOMODEL ? {padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "#1F278B", color: "white" } } : { padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "gray" } }}>{"Click Here To Finish The Interview"}</Button>     </box> : null}

        </box>
          :

          <box component="div" className="thanksScreen">
            You Have Finished The Interview
            Thank You For Your Time, {CandidateName}!
            {/* <box component="div" className="thanksScreen">
              <Button variant="contained" disabled={CLICKSENDTOMODEL} onClick={CallingTheModel} sx={{ padding: "0.5rem 2rem", background: "#14359F", borderRadius: "8px", "&:hover": { background: "white", color: "#14359F" } }}  >{"Click Here To Finish The Interview"}</Button>     </box>   */}

          </box>

        }
      </Container>
    </>
  )
}

export default Question_screen;