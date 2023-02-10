
// components
import { SiMicrosoftexcel } from "react-icons/si";
import { MdAttachFile } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useVacancyContext } from "../../Hook/UseVacancy"
import { create } from 'zustand';
import { useQuestionContext } from '../../Hook/UseQuestion'
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useAdminContext } from "../../Hook/useAdminContext"

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
import { Popup_validate } from '../../component/Popup_validate'
import * as XLSX from 'xlsx';
import WarningIcon from '@material-ui/icons/Warning';
import {CiWarning }  from "react-icons/ci";
import {TiWarningOutline}  from "react-icons/ti";
import {BsCheck2} from "react-icons/bs";
import {VscWarning} from "react-icons/vsc";
const UploadRecruiterList = () => {




    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [EmailSubject, setEmailSubject] = useState('')
    const [VACANCYID, setVACANCYID] = useState('')
    const [Time, setTime] = useState('')
    const [EmailBody, setEmailBody] = useState('');
    const { Positions, dispatch } = usePositionsContext()
    const { Recruiter } = useRecruiterContext()

    const { Admin } = useAdminContext()

    const [isShownvalue, setisShownvalue] = useState(false);

    const [isShown, setIsShown] = useState(false);

    const EMPLOYEEID = "63cc0103d75b12073f2a96fb"


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



    const handleselectedFile = async (event) => {
        // event.stopPropagation();
        let fileType = event.target.files[0].type;
        console.log(fileType)
        let validExtensions = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if (!validExtensions.includes(fileType)) {
            // alert("Only .XLSX and .CSV files are allowed");

            confirmAlert({
                // ----change ui---
                customUI: ({ onClose }) => {
                  return (
          
                    <div className='custom-ui' style={{ width: "max(148px, 110%)", background: "#333333", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "2%" }}>
                      {/* <h3>Confirmation Message</h3> */}
          
                      <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><VscWarning size={35} style={{ color: "#7024C4", margin: "-13px" }} /> &nbsp; Only .XLSX and .CSV Files Are Allowed</p>
                    </div>
                  )
                }
                // ----//change ui---
          
              })

            event.target.value = "";
        } else {
            setisShownselectedFile(true)
            setisShownselectedFile2222(true)
            setselectedFile(event.target.files[0]);
            console.log("enterrr handleselectedFile");
            setselectedFileName(event.target.files[0].name);
            setIsShown(true);

            setdisabled2(false)



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


    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet([{ Employee_Name: '', Employee_ID: '', Employee_UserName: '', Employee_Password: '' }]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employee");
        XLSX.writeFile(workbook, `ExcelFormat.xlsx`);
    };

    const showAlertConfirmation = (event) => {
        console.log('enterrrrrrrrrrr cancel')

        var msg = parse('<h3 style="text-align: center">Are You Sure You Want To Upload This Sheet?</h3>')
        confirmAlert({
            // message: msg,
            // buttons: [
            //     {
            //         label: 'Confirm',
            //         onClick: () => handleSubmitxsxlSheet(event),

            //     },
            //     {
            //         label: 'Cancel',
            //         onClick: () => setAnchorEl(null)
            //     }

            // ]

            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%" }}>
                        <h3>Confirmation Message</h3>
                        <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>Are You Sure You Want To Upload These Recruiters?</p>

                        <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                            <button onClick={() => {
                                setAnchorEl(null)
                                onClose()
                            }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>Cancel</button>
                            <button onClick={() => {
                                handleSubmitxsxlSheet(event)
                                onClose()
                            }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Confirm</button>
                        </div>
                    </div>
                )
            }
        })

    }

    const handleSubmitxsxlSheet = async () => {
        console.log("Enter handleSubmitxsxlSheet For Employeeee")
        const data = new FormData();
        data.append('uploadfile', selectedFile)

        //https://backend-pinnacle.herokuapp.com/

        const responseee = await fetch('https://backend-pinnacle.herokuapp.com/api/Admin/UPLOADMPLOYEE/' + EMPLOYEEID, {
            method: 'POST',
            body: data,
            headers: {

                'Authorization': `Bearer ${Admin.tokenn}`,
            }
        })

        const json = await responseee.json()
        if (responseee.ok) {
            showAlertSuccess()
            navigate(`/RecruiterList`);
        }



    }


    const showAlertSuccess = () => {
        var msg = parse('<h3 style="text-align: center">Employees Uploaded Successfully</h3>')
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
      
                  <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "white" }}><BsCheck2 size={35} style={{ color: "#A1E3CB", margin: "-13px" }} /> &nbsp; Recruiters Uploaded Successfully</p>
                </div>
              )
            }
            // ----//change ui---
      
          })
    }

    return (

        <>
            <Box className="contianer_main" >
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



                                {/* ----File upload---- */}
                                <Grid item xs={12} marginTop={4}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography fontWeight={700}>
                                                Upload Recruiters Information
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
                                                        fontSize: "28px"
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


                                    {/*   <button style={!disabled ? { cursor: "pointer", borderRadius: "5px", color: "#14359F", backgroundColor: "#F7F9FB", border: "none", width: "110px", height: "30px", borderColor: "#14359F" } : { cursor: "pointer", borderRadius: "5px", color: "rgb(74, 74, 74)", backgroundColor: "gray", border: "none", width: "110px", height: "30px", borderColor: "gray" }} disabled={disabled} onClick={showAlertConfirmationForSave}> Save </button>*/}

                                    <button style={!disabled2 ? { cursor: "pointer", borderRadius: "5px", color: "white", backgroundColor: "#14359F", border: "none", width: "110px", height: "30px" } : { cursor: "pointer", borderRadius: "5px", color: "rgb(74, 74, 74)", backgroundColor: "gray", border: "none", width: "110px", height: "30px" }} disabled={disabled2} onClick={showAlertConfirmation} > Upload </button>

                                </Grid>
                                {/* --- submit Button--- */}
                            </Grid>








                        </Grid>


                    </Grid>
                </Grid>
            </Box>
        </>


    )
}

export default UploadRecruiterList