import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Question_AppBar from './Question_AppBar';
import Question_SideBar from './Question_SideBar';
import Question_screen from './Question_screen';
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

// -----------------------------
const drawerWidth = 300;
function Question_interview(props) {

  // -------------steps functions-----------
  //let steps = [''];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

 // --------questionHeading-------------
 const [questionHeading, setquestionHeading] = React.useState('');
 console.log(questionHeading)


  const { VacancyID } = useParams();
  const { CandidateDocID } = useParams();
  const { CandidateID } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [CandidateName, setCandidateName] = useState('')
  const [VacancyQuestion, setVacancyQuestion] = useState([{}])
  const [QUESTIONS, setQUESTIONS] = useState([{}])
  const [steps, setsteps] = useState([''])

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



    const fetchVacancyInfo = async () => {

      const response = await fetch('/api/Recruiter/EnetrVacancyInfoForeQuestion/' + VacancyID, {
      })
      const json = await response.json()
      if (response.ok) {
        console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
        setVacancyQuestion(json.Position)
        console.log(json.Position)


        json.Position && json.Position.map((item, i) => {
          setQUESTIONS(item.arr)
          console.log(item.arr)

          var j = 0
          item.arr && item.arr.map((itemmmms, x) => {
            console.log(`${itemmmms.questions}`)
            steps[j] = itemmmms.questions
            j = x + 1
          })
          console.log(steps)
          setsteps(steps)
          setquestionHeading(steps[0])
        })

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




    if (!Recruiter) {
      fetchPosition()
      fetchVacancyInfo()
    }
  }, [VacancyID, CandidateDocID, CandidateID])



  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;



 
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    setquestionHeading(steps[activeStep + 1])
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // ----------

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* ---App bar---- */}
      <Question_AppBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

      {/* ----sidebar-- */}
      <Question_SideBar container={container} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawer={drawer} isStepOptional={isStepOptional} activeStep={activeStep} isStepSkipped={isStepSkipped} handleReset={handleReset} handleBack={handleBack} handleSkip={handleSkip} handleNext={handleNext} steps={steps} CandidateName={CandidateName} />


      {/* ----contnet--- */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "98vh", overflow: "auto" }}
      >
        <Toolbar />
        {console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")}
        {console.log(steps)}
        {console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")}
        <Question_screen handleNext={handleNext} questionHeading={questionHeading} steps={steps} activeStep={activeStep} CandidateName={CandidateName} />

      </Box>
      {/* ----//contnet--- */}
    </Box>
  );
}

Question_interview.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Question_interview;