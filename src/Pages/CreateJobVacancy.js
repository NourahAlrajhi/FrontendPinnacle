// components
import { SiMicrosoftexcel } from "react-icons/si";
import { MdAttachFile } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../Hook/usePositionsContext"
import { useVacancyContext } from "../Hook/UseVacancy"
import { create } from 'zustand';
import { useQuestionContext } from '../Hook/UseQuestion'
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Paper from '@mui/material/Paper';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import { Button, Divider, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import zIndex from "@mui/material/styles/zIndex";
import { ImProfile, ImHome } from "react-icons/im";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { v4 } from 'uuid';
import * as React from 'react';
import { BiTrash } from "react-icons/bi";
import classnames from 'classnames';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Container from '@material-ui/core/Container';
import { margin } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AdapterJalaali from '@date-io/jalaali';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useParams } from "react-router-dom";
import { read, utils, writeFile, useExcelDownloder } from 'xlsx';
import { Popup_validate } from '../component/Popup_validate'
import * as XLSX from 'xlsx';
import WarningIcon from '@material-ui/icons/Warning';
import {CiWarning }  from "react-icons/ci";
import {TiWarningOutline}  from "react-icons/ti";
import {BsCheck2} from "react-icons/bs";
import {VscWarning} from "react-icons/vsc";

const DummyCandidateALLINFO = [{
    CandidateID: "",
    CandidateEmail: ""
}]

const CreateJobbVacancy = () => {

    const { Vacancy, dispatchhh } = useVacancyContext()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [EmailSubject, setEmailSubject] = useState('')
    const [VACANCYID, setVACANCYID] = useState('')
    const [Time, setTime] = useState('')
    const [EmailBody, setEmailBody] = useState('');
    const { Positions, dispatch } = usePositionsContext()
    const { Recruiter } = useRecruiterContext()
    const startDate = new Date();
    const [value, setValue] = React.useState(new Date().toISOString());
    const [isShownvalue, setisShownvalue] = useState(false);

    const [isShown, setIsShown] = useState(false);
    const [PositionChoosen, setPositionChoosen] = useState('');

    //const [CandidateALLINFO, setCandidateALLINFO] = useState(DummyCandidateALLINFO)
    const [PositioArray, setPositioArray] = useState([{}]);
    const [isShownPositioArray, setisShownPositioArray] = useState(false);

    const [selectedFile, setselectedFile] = useState();
    const [isShownselectedFile, setisShownselectedFile] = useState(false);
    const [isShownselectedFile2222, setisShownselectedFile2222] = useState(false);


    const [selectedFileName, setselectedFileName] = useState('');
    const [error, setError] = useState(null)
    const [VACANCYLIST, setVACANCYLIST] = useState([{}])
    const [CandidateID, setCandidateID] = useState('')
    const [CandidatInfo, setCandidatInfo] = useState([{}])
    const [CandidatEmails, setCandidatEmails] = useState([''])
    const [disabled, setDisabled] = useState(true);
    const [isShownCancelButton, setShownCancelButton] = useState(false);

    const [disabled2, setdisabled2] = useState(true);

    const handleChange = (newValue) => {
        setisShownvalue(true)
        /*  var date = new Date(dayjs(newValue).get('year'), dayjs(newValue).get('month'), dayjs(newValue).get('date'));
          setValue(date)
          console.log(dayjs(newValue).get('year') + "/" + dayjs(newValue).get('month') + "/" + dayjs(newValue).get('date'))
          setTime(dayjs(newValue).get('hour') + ":" + dayjs(newValue).get('minute') + ":" + dayjs(newValue).get('second'))*/
        setValue(newValue.toISOString());
        console.log(newValue.toISOString())

        setEmailBody("Dear Candidate," +
            `Thank you for your application to the ${PositionChoosen} role at ELM.` +
            "We would like to invite you to interview for the role by joining this link." +
            "The interview will last between10 - 30 minuts in total." +
            "Please note that the link will expire on the following date and time: " +
            `Date : ${(new Date(newValue).getDate()) + "/" + (new Date(newValue).getMonth() + 1) + "/" + (new Date(newValue).getFullYear())}  ` +
            ` Time : ${dayjs(newValue).get('hour') + ":" + dayjs(newValue).get('minute') + ":" + dayjs(newValue).get('second')}`
        )

        // console.log( newValue.getHours() +"-"+newValue.getMinutes())
        //  console.log(dayjs(newValue))
        if (isShownPositioArray && isShownselectedFile && !isShownvalue) {
            setdisabled2(false)
        }
    };


    const handleselectedFile = async (event) => {
        // event.stopPropagation();
        let fileType = event.target.files[0].type;
        console.log(fileType)
        let validExtensions = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if (!validExtensions.includes(fileType)) {
            alert("Only .XLSX and .CSV files are allowed");
            event.target.value = "";
        } else {
            setisShownselectedFile(true)
            setisShownselectedFile2222(true)
            setselectedFile(event.target.files[0]);
            console.log("enterrr handleselectedFile");
            setselectedFileName(event.target.files[0].name);
            setIsShown(true);
            if (isShownPositioArray && !isShownselectedFile && isShownvalue) {
                setdisabled2(false)
            }

            console.log(isShownPositioArray + "-------" + isShownselectedFile + "---------" + EmailSubject)
        }
    }


    const showAlertConfirmationForSelectinFile = (event) => {

        console.log('enterrrrrrrrrrr cancel')

        var msg = parse('<h3 style="text-align: center">A Sheet Is Already Uploaded Are You Sure You Want To Replace It?</h3>')
        confirmAlert({
            // message: msg,
            // buttons: [
            //     {
            //         label: 'Confirm',
            //         onClick: () => setisShownselectedFile2222(false),

            //     },
            //     {
            //         label: 'Cancel',
            //         onClick: () => setAnchorEl(null)
            //     }

            // ]

            // ----change ui---
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%" }}>
                        <h3>Confirmation Message</h3>
                        <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>A Sheet Is Already Uploaded Are You Sure You Want To Replace It?</p>

                        <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                            <button onClick={() => {
                                setAnchorEl(null)
                                onClose()
                            }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>Cancel</button>
                            <button onClick={() => {
                                setisShownselectedFile2222(false)
                                onClose()
                            }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Confirm</button>
                        </div>
                    </div>
                )
            }
            // ----//change ui---
        })

    }




    const showAlertConfirmation = (event) => {
        console.log('enterrrrrrrrrrr cancel')

        var msg = parse('<h3 style="text-align: center">Are You Sure You Want To Send Interview Invitations To Candidates?</h3>')
        confirmAlert({
            // message: msg,
            // buttons: [
            //     {
            //         label: 'Confirm',
            //         onClick: () => handleSubmit(event),

            //     },
            //     {
            //         label: 'Cancel',
            //         onClick: () => setAnchorEl(null)
            //     }

            // ]

            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%",marginLeft:"374px"}}>
                        <h3>Confirmation Message</h3>
                        <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>Are You Sure You Want To Send Interview Invitations To Candidates?</p>

                        <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                            <button onClick={() => {
                               setAnchorEl(null)
                                onClose()
                            }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>Cancel</button>
                            <button onClick={() => {
                               handleSubmit(event)
                                onClose()
                            }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Confirm</button>
                        </div>
                    </div>
                )
            }
        })

    }



    const showAlertConfirmationForSave = (event) => {
        //  setShownCancelButton(true, () => console.log('new CancelButton state: ', isShownCancelButton));
        //setShownCancelButton(true)
        //  console.log('enterrrrrrrrrrr cancel')
        //console.log( isShownCancelButton)
        var msg = parse('<h3 style="text-align: center">Are You Sure You Want To Save This Job Vacancy Without Sending Interview Invitations To Candidates?</h3>')
        confirmAlert({
            // title: 'Confirmation Message',
            // message: msg,
            // buttons: [
            //     {
            //         label: 'Confirm',
            //         onClick: () => handleSubmit2(event),

            //     },
            //     {
            //         label: 'Cancel',
            //         onClick: () => setAnchorEl(null)
            //     }

            // ]
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%" ,marginLeft:"374px"}}>
                        <h3>Confirmation Message</h3>
                        <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>Are You Sure You Want To Save This Job Vacancy Without Sending Interview Invitations To Candidates?</p>

                        <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                            <button onClick={() => {
                               setAnchorEl(null)
                                onClose()
                            }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>Cancel</button>
                            <button onClick={() => {
                               handleSubmit2(event)
                                onClose()
                            }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Confirm</button>
                        </div>
                    </div>
                )
            }
        })

    }



    const OnChoosenPosition = async (ID) => {
        setisShownPositioArray(true)
        if (!Recruiter) {
            return
        }
        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position/' + ID, {
            headers: { 'Authorization': `Bearer ${Recruiter.token}` },
        })
        const json = await response.json()
        if (response.ok) {
            setPositioArray([{
                _id: json._id,
                arr: json.arr,
                description: json.description,
                name: json.name,
                noticePeriod: json.noticePeriod,
                ExpectedSalary: json.ExpectedSalary,
                user_id: json.user_id
            }])
            // dispatch({ type: 'DELETE_Position', payload: json })
            // navigate('/PositionList');
            setPositionChoosen(json.name)
            console.log(json.name)
            setEmailSubject(`ELM: ${json.name}`)

            setEmailBody("Dear Candidate," +
                `Thank you for your application to the ${json.name} role at ELM.` +
                "We would like to invite you to interview for the role by joining this link." +
                "The interview will last between10 - 30 minuts in total." +
                "Please note that the link will expire on the following date and time:")
            console.log(`ELM: ${json.name}`)
            setDisabled(false);
            // console.log(isShownPositioArray +"-------" +isShownselectedFile+"---------"+EmailSubject)
            if (!isShownPositioArray && isShownselectedFile && isShownvalue) {
                setdisabled2(false)
            }
        }
    }

    useEffect(() => {
        console.log("formRows: ", Positions);
        const fetchPosition = async () => {
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position', {
                headers: { 'Authorization': `Bearer ${Recruiter.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_Position', payload: json })
            }
        }
        if (Recruiter) {
            fetchPosition()
        }
    }, [dispatch, Recruiter])




    const showAlertSuccess33 = (error) => {
        var msg = parse(`<h3 style="text-align: center">${error}</h3>`)
        // confirmAlert({
        //     message: msg,
        //     buttons: []
        // })

        confirmAlert({
            // ----change ui---
            customUI: ({ onClose }) => {
              return (
      
                <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
                  {/* <h3>Confirmation Message</h3> */}
      
                  <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><VscWarning size={35} style={{ color: "#7024C4", margin: "-13px" }} /> &nbsp; {error}</p>
                </div>
              )
            }
            // ----//change ui---
      
          })
    }


    const showAlertSuccess = () => {
        var msg = parse('<h3 style="text-align: center">Job Vacancy Opened Successfully</h3>')
        // confirmAlert({
        //     message: msg,
        //     buttons: []
        // })

        confirmAlert({
            // ----change ui---
            customUI: ({ onClose }) => {
              return (
      
                <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
                  {/* <h3>Confirmation Message</h3> */}
      
                  <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><BsCheck2 size={35} style={{ color: "#A1E3CB", margin: "-13px" }} /> &nbsp; Job Vacancy Opened Successfully</p>
                </div>
              )
            }
            // ----//change ui---
      
          })
    }





    const handleSubmit = async (e) => {
        console.log("Enter beginingggggg handleSubmitJobVacancy")
        // console.log( isShownCancelButton)
        e.preventDefault()
        if (!Recruiter) {
            setError('You must be logged in')
            return
        }
        //  { error && showAlertSuccess33(error) }


        //  { error && showAlertSuccess33(error) }
        const Vacancy = { Position: PositioArray, title: PositionChoosen, Esubject: EmailSubject, Ebody: EmailBody, linkExpDate: value, linkExpTime: value, status: "Active" }
        //https://backend-pinnacle.herokuapp.com/
        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position/Update', {
            method: 'POST',
            body: JSON.stringify(Vacancy),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Recruiter.token}`,
            }
        })
        const json = await response.json()
        console.log("Enter beginingggggg2")

        if (!response.ok) {
            setError(json.error)
            showAlertSuccess33(json.error)
        }
        if (response.ok) {
            setVACANCYID(json._id)
            console.log("Enter beginingggggg3")
            setError(null)
            handleSubmitxsxlSheet(json._id, json.linkExpDate, json.linkExpTime)
            //  dispatchhh({ type: 'CREATE_Vacancy', payload: json })
            showAlertSuccess()
            navigate(`/Dashboard/View_job_vacancy_main`);
        }



    }





    const handleSubmit2 = async (e) => {
        console.log("Enter beginingggggg handleSubmitJobVacancy")
        console.log(isShownCancelButton)
        e.preventDefault()
        if (!Recruiter) {
            setError('You must be logged in')
            return
        }
        //  { error && showAlertSuccess33(error) }


        console.log("No file have been uploaded");
        const Vacancy = { Positionnn: PositioArray, titleee: PositionChoosen, Esubjecttt: EmailSubject, Ebodyyy: EmailBody, linkExpDateee: value, linkExpTimeee: value, statusss: "Open" }
        //https://backend-pinnacle.herokuapp.com
        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position/Update', {
            method: 'POST',
            body: JSON.stringify(Vacancy),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Recruiter.token}`,
            }
        })
        const json = await response.json()
        console.log("Enter beginingggggg2")

        if (!response.ok) {
            setError(json.error)
            showAlertSuccess33(json.error)
        }
        if (response.ok) {

            console.log("Enter Adding Job vacancy in open section")
            setError(null)
            if (isShownselectedFile) {
                handleSubmitxsxlSheet2()
            }
            showAlertSuccess()
            navigate(`/Dashboard/View_job_vacancy_main/Open_jop_vacancies_main`);
        }




    }


    function disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }



    const handleSubmitxsxlSheet = async (e, Datee, Time) => {
        console.log("sssssssssssssssssssssssss")
        console.log(e)
        console.log("sssssssssssssssssssssssss")
        let CandidateEmail = ['']

        let CandidateALLINFO = [{}]

        console.log("Enter handleSubmitxsxlSheet")
        const data = new FormData();
        data.append('uploadfile', selectedFile)

        //https://backend-pinnacle.herokuapp.com/

        const responseee = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/UPLOAD', {
            method: 'POST',
            body: data,
            headers: {

                'Authorization': `Bearer ${Recruiter.token}`,
            }
        })

        const json = await responseee.json()
        if (responseee.ok) {
            setCandidateID(json._id)
            console.log("Candidatedata is takennnnnn")



            //https://backend-pinnacle.herokuapp.com/
            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/Candidate/' + json._id, {
                headers: { 'Authorization': `Bearer ${Recruiter.token}` },
            })
            const jsonnnn = await response.json()
            if (response.ok) {
                setCandidatInfo(jsonnnn.Candidate_Info)
                console.log("Candidatedata is takennnnnn2222")

                console.log(jsonnnn.Candidate_Info)
                var j = 0
                jsonnnn.Candidate_Info && jsonnnn.Candidate_Info.map((item, i) => {
                    console.log(`${item.Candidate_Email}`)


                    /*  setCandidateALLINFO(s => {
                          return [
                              ...s,
                              {
                                  CandidateID: item.id,
                                  CandidateEmail: item.Candidate_Email
                              }
                          ];
                      });*/

                    /* CandidateALLINFO = [{
                         CandidateID: item.id,
                         CandidateEmail: item.Candidate_Email
                     }]*/
                    CandidateALLINFO[j] = {
                        CandidateID: item.id,
                        CandidateEmail: item.Candidate_Email
                    }

                    CandidateEmail[j] = item.Candidate_Email


                    j = i + 1
                }

                )
                console.log("55555555555555555555555555555555")
                console.log(CandidateALLINFO)
                console.log("55555555555555555555555555555555")
                console.log(json._id)

                const Positionssss = { CandidateALLINFO, EmailSubject, EmailBody, e, PositionChoosen, Datee, Time, CandidateDocId: json._id }
                console.log("Enter the final destination");
                console.log(`${CandidateEmail}`)
                const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/sendEmail', {
                    method: 'POST',
                    body: JSON.stringify(Positionssss),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Recruiter.token}`
                    },
                }).then(response => {
                    console.log("response", response);
                    console.log("Sending Emailllls")
                    return response.json()
                }).catch(err => console.log(err))
            }



        }



    }




    const handleSubmitxsxlSheet2 = async (e) => {
        let CandidateEmail = ['']

        console.log("Enter handleSubmitxsxlSheet")
        const data = new FormData();
        data.append('uploadfile', selectedFile)

        //   const Positionssss = { data, VACANCYID }

        const responseee = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/UPLOAD', {
            method: 'POST',
            body: data,
            headers: {

                'Authorization': `Bearer ${Recruiter.token}`,
            }
        })

        const json = await responseee.json()
        if (responseee.ok) {
            setCandidateID(json._id)
            console.log("Candidatedata is takennnnnn")
            console.log(json._id)



            const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/' + json._id, {
                headers: { 'Authorization': `Bearer ${Recruiter.token}` },
            })
            const jsonnnn = await response.json()
            if (response.ok) {
                setCandidatInfo(jsonnnn.Candidate_Info)
                console.log("Candidatedata is takennnnnn2222")

                console.log(jsonnnn.Candidate_Info)
                var j = 0
                jsonnnn.Candidate_Info && jsonnnn.Candidate_Info.map((item, i) => {
                    console.log(`${item.Candidate_Email}`)

                    CandidateEmail[j] = item.Candidate_Email


                    j = i + 1
                }

                )



                /* const Positionssss = { CandidateEmail, EmailSubject, EmailBody }
                 console.log("Enter the final destination");
                 console.log(`${CandidateEmail}`)
                 const response = await fetch('/api/Candidate/sendEmail', {
                     method: 'POST',
                     body: JSON.stringify(Positionssss),
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${Recruiter.token}` },
                 }).then(response => {
                     console.log("response", response);
                     console.log("Sending Emailllls")
                     return response.json()
                 }).catch(err => console.log(err))*/
            }



        }



    }




    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet([{ Candidate_Name: '', Candidate_Email: '', Candidate_Phone__Number: '' }]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
        XLSX.writeFile(workbook, `ExcelFormat.xlsx`);
    };



    return (
        <>

            <Grid container
                spacing={2}
                sx={{
                    padding: { xs: "20px", md: "20px" },
                    marginBottom: { xs: "70px", md: "70px" },
                }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        boxShadow: "0px 0px 5px lightgray",
                        borderRadius: "20px",
                        padding: "10px",
                    }}
                >
                    {/* ----content---- */}
                    <Grid container>




                        {/* ----Position Choose---- */}
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontWeight={700}>
                                        Choose Position
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {/* input 1 */}
                                    <FormControl
                                        sx={{ mt: 3, ml: 3, width: "min(100% , 279px)" }}
                                        variant="outlined"
                                    >

                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            // value={item.value}
                                            //     onChange={handleChange}
                                            //  id={i}
                                            label="Position"
                                            //defaultValue="EUR"
                                            className='imprtanceOfQ'
                                            style={{


                                                width: "810px"
                                            }}
                                        >
                                            {Positions && Positions.map((option) => (
                                                <MenuItem key={option.name} value={option.name} onClick={() => OnChoosenPosition(option._id)}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid elevation={3} style={{
                                    position: "absolute",
                                    left: "880px",
                                    paddingTop: "60px"

                                }}>
                                    <a style={{
                                        width: "330px",
                                        height: "70px",
                                        color: "#14359F", cursor: "pointer", textDecoration: "underline", padding: "17px",
                                    }} onClick={() => navigate(`/PositionForm`)}>Add Position</a></Grid>

                            </Grid>
                        </Grid>
                        {/* ----//Position Choose---- */}


                        {/*   <div className="Section1">
                    <h3 style={{
                        width: "250px", position: "absolute",
                        left: "40px",
                        top: "30px"
                    }}>Choose Position </h3>
                    <TextField
                        id="outlined-select-currency"
                        select
                        // value={item.value}
                        //     onChange={handleChange}
                        //  id={i}
                        label="Position"
                        //defaultValue="EUR"
                        className='imprtanceOfQ'
                        style={{
                            position: "absolute",
                            left: "40px",
                            top: "80px",

                            width: "810px"
                        }}
                    >
                        {Positions && Positions.map((option) => (
                            <MenuItem key={option.name} value={option.name} onClick={() => OnChoosenPosition(option._id)}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                        </div>*/}

                        {/* ----File upload---- */}
                        <Grid item xs={12} marginTop={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontWeight={700}>
                                        Upload Candidats Information
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} xl={3}>
                                    {/* input 3 */}
                                    <FormControl
                                        sx={{ mt: 3, ml: 3, width: "min(100% 279px)" }}
                                        variant="outlined"
                                    >

                                        <Grid
                                            item
                                            xs={9}
                                            sx={{
                                                mt: 2,
                                                p: 2,
                                                boxShadow: "0px 0px 5px lightgray",
                                                maxHeight: "200px",
                                                overflow: "auto",
                                                borderRadius: "20px",
                                                padding: "10px",
                                                marginTop: "-9px",
                                            }}
                                        >
                                            {/* ----Questions---- */}
                                            <Grid container  >
                                                <SiMicrosoftexcel style={{
                                                    width: '87%', height: '68px', overflow: 'scroll',
                                                    padding: "0px",
                                                    marginTop: "-1px",
                                                }} />


                                                {isShownselectedFile2222 ?


                                                    <a


                                                        //name="uploadfile"
                                                        id="file-upload"
                                                        onClick={showAlertConfirmationForSelectinFile}
                                                        style={{
                                                            width: "230px",
                                                            height: "70px",
                                                            color: "#14359F", cursor: "pointer", textDecoration: "underline", padding: "17px",
                                                        }}
                                                    // value={selectedFile}
                                                    //accept=".xlsx"
                                                    >File Has Been Choosen</a>
                                                    :
                                                    <input
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <MdAttachFile />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        type="file"
                                                        name="uploadfile"
                                                        id="file-upload"
                                                        onChange={handleselectedFile}
                                                        style={{
                                                            width: "230px",
                                                            color: "#14359F", cursor: "pointer"
                                                        }}
                                                    // value={selectedFile}
                                                    // accept=".xlsx"
                                                    />
                                                }


                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} xl={3}>
                                    {/* input 4 */}
                                    <FormControl
                                        sx={{ mt: 2, ml: -30, width: "min(100% 279px)" }}
                                        variant="outlined"
                                    >

                                        <Grid elevation={3} style={{
                                            zIndex: '10', width: '2290%', height: '159px', overflow: 'scroll', radius: "20px", boxShadow: "0px 0px 5px lightgray",
                                            borderRadius: "20px",
                                            padding: "8px",
                                            backgroundColor: "white"
                                        }} className="box">
                                            {isShown && (
                                                <FcFile style={{
                                                    width: "250px",
                                                    height: '78px',
                                                    position: "absolute",
                                                    left: "-70px",
                                                    top: "40px",

                                                }} />)}
                                            <p style={{
                                                width: "250px", position: "absolute",
                                                left: "100px",
                                                top: "50px",
                                                fontSize: "32px"
                                            }}>{selectedFileName}</p>
                                        </Grid>
                                    </FormControl>

                                </Grid>
                                <Grid elevation={3} style={{
                                    position: "absolute",
                                    left: "840px",
                                    paddingTop: "92px"

                                }}>
                                    <a style={{
                                        width: "330px",
                                        height: "70px",
                                        color: "#14359F", cursor: "pointer", textDecoration: "underline", padding: "17px",
                                    }} onClick={downloadExcel}>Excel Format</a></Grid>
                            </Grid>
                        </Grid>
                        {/* ----// File upload---- */}


                        {/*   <div className="Section1" style={{
                            width: "250px", position: "absolute",
                            left: "-43px",
                            top: "170px"
                        }}>
                            <h3 style={{
                                width: "350px", position: "absolute",
                                left: "90px",
                                top: "30px"
                            }}>Upload Candidats Information</h3>


                            <Grid elevation={3} style={{
                                zIndex: '10', width: '130%', height: '139px', overflow: 'scroll', position: "absolute", top: "73px", left: "78px", radius: "20px", boxShadow: "0px 0px 5px lightgray",
                                borderRadius: "20px",
                                padding: "10px",
                                backgroundColor: "white"
                            }} className="box">
                                <SiMicrosoftexcel style={{
                                    width: '23%', height: '58px', overflow: 'scroll', position: "absolute", top: "13px", left: "98px",
                                    padding: "10px",

                                }} />


                                {isShownselectedFile2222 ?


                                    <a


                                        //name="uploadfile"
                                        id="file-upload"
                                        onClick={showAlertConfirmationForSelectinFile}
                                        style={{
                                            width: "210px", position: "absolute",
                                            left: "80px",
                                            top: "97px",
                                            color: "#14359F", cursor: "pointer", textDecoration: "underline"
                                        }}
                                    // value={selectedFile}
                                    //accept=".xlsx"
                                    >File Has Been Choosen</a>





                                    :
                                    <input
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdAttachFile />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="file"
                                        name="uploadfile"
                                        id="file-upload"
                                        onChange={handleselectedFile}
                                        style={{
                                            width: "210px", position: "absolute",
                                            left: "50px",
                                            top: "77px",
                                            color: "#14359F", cursor: "pointer"
                                        }}
                                    // value={selectedFile}
                                    // accept=".xlsx"
                                    />
                                }


                            </Grid>

                            <Grid elevation={3} style={{
                                zIndex: '10', width: '230%', height: '139px', overflow: 'scroll', position: "absolute", top: "73px", left: "498px", radius: "20px", boxShadow: "0px 0px 5px lightgray",
                                borderRadius: "20px",
                                padding: "10px",
                                backgroundColor: "white"
                            }} className="box">
                                {isShown && (
                                    <FcFile style={{
                                        width: "250px",
                                        height: '58px',
                                        position: "absolute",
                                        left: "-70px",
                                        top: "40px",

                                    }} />)}
                                <p style={{
                                    width: "250px", position: "absolute",
                                    left: "100px",
                                    top: "50px",
                                    fontSize: "22px"
                                }}>{selectedFileName}</p>
                            </Grid>

                            </div>*/}


                        {/* ----File upload---- */}
                        <Grid item xs={12} marginTop={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontWeight={700}>
                                        Interview Invitation Email
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} xl={3}>
                                    {/* input 3 */}
                                    <FormControl
                                        sx={{ mt: 3, ml: 3, width: "min(100% 279px)" }}
                                        variant="outlined"
                                    >
                                        <Grid elevation={3} style={{
                                            zIndex: '10', width: '395%', height: '480px', overflow: 'scroll', radius: "20px", boxShadow: "0px 0px 5px lightgray",
                                            borderRadius: "20px",
                                            padding: "123px",
                                            backgroundColor: "white"
                                        }} className="box">



                                            <TextField
                                                id="outlined-required"
                                                label="Email Subject"

                                                onChange={(e) => setEmailSubject(e.target.value)}
                                                value={EmailSubject}
                                                // placeholder="Enter Email Subject"
                                                style={{
                                                    width: "450px",
                                                    position: "absolute",
                                                    left: "40px",
                                                    top: "60px"
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <Box style={{

                                                width: "450px",
                                                position: "absolute",
                                                left: "510px",
                                                top: "60px",
                                            }} display="flex" >


                                                <LocalizationProvider dateAdapter={AdapterDayjs} >

                                                    <DesktopDatePicker
                                                        id="DatePicker"
                                                        label="Date "
                                                        inputFormat="MM/DD/YYYY"
                                                        value={value}
                                                        onChange={handleChange}
                                                        renderInput={(params) => <TextField {...params} sx={{ mr: 2 }} error={false} />}
                                                        shouldDisableDate={disablePrevDates(startDate)}
                                                    />
                                                    {" "}
                                                    <TimePicker
                                                        id="TimePicker"
                                                        label="Time"
                                                        value={value}
                                                        onChange={handleChange}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />

                                                </LocalizationProvider>

                                            </Box>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Email Body"
                                                multiline
                                                rows={10}
                                                onChange={(e) => setEmailBody(e.target.value)}
                                                value={EmailBody}
                                                placeholder="Enter Email body"
                                                style={{
                                                    width: "870px",
                                                    position: "absolute",
                                                    left: "40px",
                                                    top: "160px"
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />


                                        </Grid>
                                    </FormControl>
                                </Grid>


                            </Grid>
                            {/* --- submit Button--- */}
                            <Grid
                                item
                                xs={12}
                                margin={3}
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "flex-end",
                                }}
                            >


                                <button style={!disabled ? { cursor: "pointer", borderRadius: "5px", color: "#14359F", backgroundColor: "#F7F9FB", border: "none", width: "110px", height: "30px", borderColor: "#14359F" } : { cursor: "pointer", borderRadius: "5px", color: "rgb(74, 74, 74)", backgroundColor: "gray", border: "none", width: "110px", height: "30px", borderColor: "gray" }} disabled={disabled} onClick={showAlertConfirmationForSave}> Save </button>

                                <button style={!disabled2 ? { cursor: "pointer", borderRadius: "5px", color: "white", backgroundColor: "#14359F", border: "none", width: "110px", height: "30px" } : { cursor: "pointer", borderRadius: "5px", color: "rgb(74, 74, 74)", backgroundColor: "gray", border: "none", width: "110px", height: "30px" }} disabled={disabled2} onClick={showAlertConfirmation} > Send </button>

                            </Grid>
                            {/* --- submit Button--- */}
                        </Grid>








                    </Grid>


                </Grid>
            </Grid>
        </>
    )



}



export default CreateJobbVacancy