import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sidebar_HeadingBox from './Sidebar_HeadingBox';
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

function Question_SideBar(props) {




    const { VacancyID } = useParams();
    const { CandidateDocID } = useParams();
    const { CandidateID } = useParams();
    const { Recruiter } = useRecruiterContext()
    const [CandidateName, setCandidateName] = useState('')
    const [VacancyQuestion, setVacancyQuestion] = useState([{}])
    const [QUESTIONS, setQUESTIONS] = useState([{}])



    useEffect(() => {
        //console.log("formRows: ", consumer);
       

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


        if (!Recruiter ) {
           
            fetchVacancyInfo()
        }
    }, [VacancyID, CandidateDocID, CandidateID])   


    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                className='sideBar_main_div'
            >
                {/* --------------small divces sidebar----------------- */}
                <Drawer
                    container={props.container}
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                    }}
                >
                    {/* ========== */}
                    {/* ---heading box--- */}
                    <Sidebar_HeadingBox />
                    {/* ---//heading box--- */}
                    {/* steps */}
                                 {console.log( QUESTIONS)}
                    <Stepper activeStep={props.activeStep} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", padding: "1rem" }}>
                        {props.steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (props.isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption"></Typography>
                                );
                            }
                            if (props.isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps}> Question {index + 1}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {/* //steps */}


                    {props.activeStep === props.steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1, p: 1, textAlign: "center" }}>
                                All Questions completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={props.handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {props.activeStep + 1}</Typography> */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                {/* <Button
                                    color="inherit"
                                    disabled={props.activeStep === 0}
                                    onClick={props.handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button> */}
                                {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                                {/* {props.isStepOptional(props.activeStep) && (
                                    <Button color="inherit" onClick={props.handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                <Button onClick={props.handleNext}>
                                    {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                                </Button> */}
                            </Box>
                        </React.Fragment>
                    )}
                    {/* ======== */}
                </Drawer>
                {/* --------------big divces sidebar----------------- */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                    }}
                    open
                >

                    {/* =============== */}
                    {/* ---heading box--- */}
                    <Sidebar_HeadingBox />
                    {/* ---//heading box--- */}

                    {/* steps */}
                    <Stepper activeStep={props.activeStep} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", padding: "1rem" }}>
                        {props.steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (props.isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption"></Typography>
                                );
                            }
                            if (props.isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps} > Question {index + 1}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {/* //steps */}
                    {props.activeStep === props.steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                           {/*  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={props.handleReset}>Reset</Button>
                            </Box>*/}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {props.activeStep + 1}</Typography> */}
                            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}> */}
                            {/* <Button
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={props.handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
                            {/* <Box sx={{ flex: '1 1 auto' }} />
            {props.isStepOptional(props.activeStep) && (
              <Button color="inherit" onClick={props.handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={props.handleNext}>
              {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
            </Button>*/}
                            {/* </Box> */}
                        </React.Fragment>
                    )}

                    {/* =============== */}
                </Drawer>
            </Box>
        </>
    )
}

export default Question_SideBar