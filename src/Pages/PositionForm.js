// components
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../Hook/usePositionsContext"
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
import { MdOutlineLockOpen } from "react-icons/md";
import classnames from 'classnames';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Container from '@material-ui/core/Container';
import { margin } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from '@mui/styles';
//import {  makeStyles } from "@material-ui/styles";


const useHelperTextStyles = makeStyles(() => ({
  root: {
    marginLeft: 240
  }
}));

const useHelperTextStyles2 = makeStyles(() => ({
  root: {
    marginLeft: 210
  }
}));

const useHelperTextStylesForDescription = makeStyles(() => ({
  root: {
    marginLeft: 510
  }
}));

const useHelperTextStylesForQuestion = makeStyles(() => ({
  root: {
    marginLeft: 170
  }
}));

const useHelperTextStylesForAnswers = makeStyles(() => ({
  root: {
    marginLeft: 170
  }
}));
// ----modal css----
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const inputArr = [
  {
    type: "text",
    id: v4(),
    questions: "",
    expectedAnswers: "",
    imprtanceOfQ: "",
    SelectedToBeOpenQuestion: false

  }
];

const currencies = [
  {
    value: 'Critical',
    label: 'Critical',
  },
  {
    value: 'High',
    label: 'High',
  },
  {
    value: 'Low',
    label: 'Low',
  },
  {
    value: 'EUR',
    label: 'Select importance',
  },

];

const PositionForm = () => {
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [noticePeriod, setnoticePeriod] = useState('')
  const [ExpectedSalary, setExpectedSalary] = useState('')
  const [status, setStatus] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const [Question, setQuestion] = useState(false);
  const [ExpectedAnswer, setExpectedAnswer] = useState(false);
  const [Importance, setImportance] = useState('');

  // const { Questionnnn ,dispatchhhhh} = useQuestionContext()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emptyFields, setEmptyFields] = useState([])
  const [arr, setArr] = useState(inputArr);
  const [error, setError] = useState(null)
  const { dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const [disabled2, setdisabled2] = useState(true);

  const [IsName, setIsName] = useState(false);
  const [IsDescription, setIsDescription] = useState(false);
  const [IsSalary, setIsSalary] = useState(false);
  const [IsNoticPeriod, setIsNoticPeriod] = useState(false);
  const [IsQuestions, setIsQuestions] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [VALIDINPUTFEILDS, setVALIDINPUTFEILDS] = useState(false);

  const [errorMessageDescription, seterrorMessageDescription] = useState("");
  const [VALIDINPUTFEILDSDescription, setVALIDINPUTFEILDSDescription] = useState(false);

  const [errorMessageNoticePeriod, seterrorMessageNoticePeriod] = useState("");
  const [VALIDINPUTFEILDSNoticePeriod, setVALIDINPUTFEILDSNoticePeriod] = useState(false);

  const [errorMessageQuestion, seterrorMessageQuestion] = useState("");
  const [VALIDINPUTFEILDSQuestion, setVALIDINPUTFEILDSQuestion] = useState(false);

  const [errorMessageExpectedAnswer, seterrorMessageExpectedAnswer] = useState("");
  const [VALIDINPUTFEILDSExpectedAnswer, setVALIDINPUTFEILDSExpectedAnswer] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [OpenEndedAnswer, setOpenEndedAnswer] = useState('');
  const [OpenEndedImportnace, setOpenEndedImportnace] = useState('');
  const [LengthCounter, setLengthCounter] = useState(0);
  const [LengthCounter22, setLengthCounter22] = useState(0);
  const CHARACTER_LIMIT_ForName = 100;
  const CHARACTER_LIMIT_ForNoticPeriod = 40;
  const CHARACTER_LIMIT_ForDescription = 500;
  const CHARACTER_LIMIT_ForQuestion = 150;
  const CHARACTER_LIMIT_ForAnswers = 150;
  const [valuEE, setvaluEE] = useState(0);
  const min = 0;
  const max = 273000;

  const triggerImportance = (VALUE, ID) => {
    setImportance(VALUE)
    console.log("----------------");
    console.log(VALUE);
    // const index = e.target.id;
    console.log(ID);
    console.log("----------------");
    setArr(s => {
      const newArr = s.slice();
      console.log("aaaaaaaaaaaaaaaaaaa222222222")
      newArr[ID].imprtanceOfQ = VALUE;
      return newArr;
    });
  }






  useEffect(() => {
    console.log("formRows: ", arr);

  }, [arr]
  );

  let removeFormFields = (removeIndex) => {
    console.log(removeIndex)
    let newFormValues = [...arr];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === removeIndex);
    // const result = arr.filter(playlist => playlist.id !== removeIndex)

    newFormValues.splice(deleteTodoIndex, 1);

    setArr([...newFormValues])

  }


  const addInput = () => {

    if (arr.length != 10) {
      console.log("Enterr addInput")
      setIsShown(true);

      setArr(s => {
        return [
          ...s,
          {
            type: "text",
            id: v4(),
            questions: "",
            expectedAnswers: "",
            imprtanceOfQ: "",
            SelectedToBeOpenQuestion: false
          }
        ];
      });
    }
    else {
      alert('You Reach The Limit Of The Question')

    }
  };


  const handleChange = e => {
    e.preventDefault();
    setLengthCounter(LengthCounter + 1)
    console.log("Enterr handleChange")
    console.log("+++++++++++++++++++")
    if (e.target.value == "") {
      setLengthCounter(0)
    }
    const index = e.target.id;
    console.log(index)

    setArr(s => {
      const newArr = s.slice();
      console.log("aaaaaaaaaaaaaaaaaaa")
      if (e.target.dataset.fieldType === "questions") {
        console.log("Enterr question")
        //   setquestions(e.target.value)
        newArr[index].questions = e.target.value;
      } if (e.target.dataset.fieldType === "expectedAnswers") {
        console.log("Enterr expectedAnswers")
        //  setexpectedAnswers(e.target.value)
        newArr[index].expectedAnswers = e.target.value;
      } if (e.target.className === "imprtanceOfQ") {
        //  setimprtanceOfQ(e.target.value)
        newArr[index].imprtanceOfQ = e.target.value;
      }

      return newArr;
    });

    var indexx;
    for (indexx = 0; indexx < arr.length; ++indexx) {
      if (!arr[indexx].questions) {
        setIsQuestions(true)
      }
      if (!arr[indexx].expectedAnswers) {
        setIsQuestions(true)
      }
      if (!arr[indexx].imprtanceOfQ) {
        setIsQuestions(true)
      }
    }


    if (IsName && IsDescription && IsSalary && IsNoticPeriod && !IsQuestions) {
      setdisabled2(false)
    }

  };












  const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
  const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)

  const onInputChange = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setVALIDINPUTFEILDS(false)
      setErrorMessage("")
      setname(e.target.value);
      setIsName(true);
      if (!IsName && IsDescription && IsSalary && IsNoticPeriod && IsQuestions) {
        setdisabled2(false)
      }
    } else {
      setVALIDINPUTFEILDS(true)
      setErrorMessage("Invalid character")
    }
  };

  const onInputChange22 = (e) => {
    const { value } = e.target;
    if (isLetters2(value)) {
      setVALIDINPUTFEILDSDescription(false)
      seterrorMessageDescription("")
      setdescription(e.target.value);
      setIsDescription(true);
      if (IsName && !IsDescription && IsSalary && IsNoticPeriod && IsQuestions) {
        setdisabled2(false)
      }
    } else {
      setVALIDINPUTFEILDSDescription(true)
      seterrorMessageDescription("Invalid character")
    }
  };

  const onInputChange33 = (e) => {
    const { value } = e.target;
    if (isLetters2(value)) {
      setVALIDINPUTFEILDSNoticePeriod(false)
      seterrorMessageNoticePeriod("")
      setnoticePeriod(e.target.value);
      setIsNoticPeriod(true);
      if (IsName && IsDescription && IsSalary && !IsNoticPeriod && IsQuestions) {
        setdisabled2(false)
      }
    } else {
      setVALIDINPUTFEILDSNoticePeriod(true)
      seterrorMessageNoticePeriod("Invalid character")
    }
  };

  const onInputChangeForAnswers = (e) => {
    const { value } = e.target;
    if (isLetters2(value)) {
      setVALIDINPUTFEILDSExpectedAnswer(false)
      seterrorMessageExpectedAnswer("")
      setLengthCounter(LengthCounter + 1)
      const index = e.target.id;
      console.log(index)
      if (e.target.value == "") {
        setLengthCounter(0)
      }
      setArr(s => {
        const newArr = s.slice();
        console.log("aaaaaaaaaaaaaaaaaaa")
        if (e.target.dataset.fieldType === "questions") {
          console.log("Enterr question")
          //   setquestions(e.target.value)
          newArr[index].questions = e.target.value;
        } if (e.target.dataset.fieldType === "expectedAnswers") {
          console.log("Enterr expectedAnswers")
          //  setexpectedAnswers(e.target.value)
          newArr[index].expectedAnswers = e.target.value;
        } if (e.target.className === "imprtanceOfQ") {
          //  setimprtanceOfQ(e.target.value)
          newArr[index].imprtanceOfQ = e.target.value;
        }

        return newArr;
      });

      var indexx;
      for (indexx = 0; indexx < arr.length; ++indexx) {
        if (!arr[indexx].questions) {
          setIsQuestions(true)
        }
        if (!arr[indexx].expectedAnswers) {
          setIsQuestions(true)
        }
        if (!arr[indexx].imprtanceOfQ) {
          setIsQuestions(true)
        }
      }


      if (IsName && IsDescription && IsSalary && IsNoticPeriod && !IsQuestions) {
        setdisabled2(false)
      }
    } else {
      setVALIDINPUTFEILDSExpectedAnswer(true)
      seterrorMessageExpectedAnswer("Invalid character")
    }
  };


  const onInputChangeForQuestion = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setVALIDINPUTFEILDSQuestion(false)
      seterrorMessageQuestion("")
      setLengthCounter22(LengthCounter22 + 1)
      const index = e.target.id;
      console.log(index)
      if (e.target.value == "") {
        setLengthCounter22(0)
      }
      setArr(s => {
        const newArr = s.slice();
        console.log("aaaaaaaaaaaaaaaaaaa")
        if (e.target.dataset.fieldType === "questions") {
          console.log("Enterr question")
          //   setquestions(e.target.value)
          newArr[index].questions = e.target.value;
        } if (e.target.dataset.fieldType === "expectedAnswers") {
          console.log("Enterr expectedAnswers")
          //  setexpectedAnswers(e.target.value)
          newArr[index].expectedAnswers = e.target.value;
        } if (e.target.className === "imprtanceOfQ") {
          //  setimprtanceOfQ(e.target.value)
          newArr[index].imprtanceOfQ = e.target.value;
        }

        return newArr;
      });

      var indexx;
      for (indexx = 0; indexx < arr.length; ++indexx) {
        if (!arr[indexx].questions) {
          setIsQuestions(true)
        }
        if (!arr[indexx].expectedAnswers) {
          setIsQuestions(true)
        }
        if (!arr[indexx].imprtanceOfQ) {
          setIsQuestions(true)
        }
      }


      if (IsName && IsDescription && IsSalary && IsNoticPeriod && !IsQuestions) {
        setdisabled2(false)
      }
    } else {
      setVALIDINPUTFEILDSQuestion(true)
      seterrorMessageQuestion("Invalid character")
    }
  };

  const showAlertSuccess22 = (e) => {
    e.preventDefault();
    console.log('enterrrrrrrrrrr cancel')
    if (name === '' && description === '' && noticePeriod === '' && ExpectedSalary === '' && arr === inputArr) {
      navigate("/PositionList")
    } else {
      var msg = parse('<h3 style="text-align: center">Are you sure you do not want to add this position?</h3>')
      confirmAlert({
        // message: msg,
        // buttons: [
        //   {
        //     label: 'Yes',
        //     onClick: () => navigate("/PositionList")
        //   },
        //   {
        //     label: 'No',
        //     onClick: () => setAnchorEl(null)
        //   }

        // ]
        // ----change ui---
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%" }}>
              <h3>Confirmation Message</h3>
              <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>Are you sure you do not want to add this position?</p>

              <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                <button onClick={() => {
                  setAnchorEl(null)
                  onClose()
                }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>No</button>
                <button onClick={() => {
                  navigate("/PositionList")
                  onClose()
                }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Yes</button>
              </div>
            </div>
          )
        }
        // ----//change ui---
      })
    }
  }



  const showAlertSuccess33 = (error) => {
    var msg = parse(`<h3 style="text-align: center">${error}</h3>`)
    confirmAlert({
      message: msg,
      buttons: []
    })
  }

  const showAlertSuccess = () => {
    var msg = parse('<h3 style="text-align: center">Position Added Successfully</h3>')
    confirmAlert({
      message: msg,
      buttons: []
    })
  }

  const handleSubmit = async (e) => {
    console.log("Enter beginingggggg")

    e.preventDefault()

    if (!Recruiter) {
      setError('You must be logged in')
      return
    }

    console.log("Enter beginingggggg")
    const Positionssss = { /*questions*//*expectedAnswers*/arr, description, name, noticePeriod,/* imprtanceOfQ,*/ ExpectedSalary }
    //https://backend-pinnacle.herokuapp.com
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position', {
      method: 'POST',
      body: JSON.stringify(Positionssss),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Recruiter.token}`,
      }
    })
    const json = await response.json()
    console.log("Enter beginingggggg2")

    if (!response.ok) {
      setError(null)
      setError(json.error)
      setEmptyFields(json.emptyFields)
      { json.error && showAlertSuccess33(json.error) }
    }
    if (response.ok) {
      console.log("Enter beginingggggg3")
      setname('')
      setdescription('')
      setnoticePeriod('')
      setExpectedSalary('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_Position', payload: json })
      navigate("/PositionList")
      showAlertSuccess()

    }
  }


  function handleTests(index) {
    let updateData = arr.map((item, i) => {
      return index === i ? { ...item, SelectedToBeOpenQuestion: !item.SelectedToBeOpenQuestion } : item;
    });
    setArr(updateData);
  }

  function handleTests2(index) {
    let updateData = arr.map((item, i) => {
      return index === i ? { ...item, SelectedToBeOpenQuestion: !item.SelectedToBeOpenQuestion } : item;
    });
    setArr(updateData);
  }

  const HandelOpenEndQuestion = (removeIndex) => {

    const index = removeIndex;
    console.log(index)

    let newFormValues = [...arr];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === index);
    newFormValues[deleteTodoIndex].expectedAnswers = "Open Ended Question"
    newFormValues[deleteTodoIndex].imprtanceOfQ = "Open Ended Question"
  }

  const HandelOpenEndQuestion2 = (removeIndex) => {

    const index = removeIndex;
    console.log(index)

    let newFormValues = [...arr];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === index);
    newFormValues[deleteTodoIndex].expectedAnswers = ""
    newFormValues[deleteTodoIndex].imprtanceOfQ = ""
  }
  const helperTextStyles = useHelperTextStyles();
  const helperTextStyles2 = useHelperTextStyles2()
  const helperTextStyles3 = useHelperTextStylesForDescription()
  const helperTextStyles4 = useHelperTextStylesForQuestion()
  const helperTextStyles5 = useHelperTextStylesForAnswers()
  return (
    <>
      <form className="create" /*onSubmit={handleSubmit}*/>
        <Grid
          container
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


              {/* ----Position Description---- */}
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      1. Position Description
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* input 1 */}
                    <FormControl
                      sx={{ mt: 3, ml: 3, width: "min(100% , 279px)" }}
                      variant="outlined"
                    >

                      <TextField
                        FormHelperTextProps={{
                          classes: {
                            root: helperTextStyles.root
                          }
                        }}
                        id="outlined-required"
                        label="Position Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImProfile />
                            </InputAdornment>
                          ),

                        }}
                        onChange={onInputChange
                        }
                        value={name}
                        placeholder="Enter Position Name"

                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ maxlength: CHARACTER_LIMIT_ForName }}

                        helperText={!VALIDINPUTFEILDS ? `${name.length}/${CHARACTER_LIMIT_ForName}` : errorMessage}
                        error={VALIDINPUTFEILDS}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ----input 2---- */}
                    <TextField
                      error={VALIDINPUTFEILDSDescription}
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextStyles3.root
                        }
                      }}
                      id="outlined-multiline-static"
                      label="Job Description"
                      multiline
                      rows={4}
                      onChange={onInputChange22}
                      value={description}
                      placeholder="Enter Job Description"
                      sx={{ mt: 3, ml: 3, width: "min(90% ,559px)" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ maxlength: CHARACTER_LIMIT_ForDescription }}

                      helperText={!VALIDINPUTFEILDSDescription ? `${description.length}/${CHARACTER_LIMIT_ForDescription}` : errorMessageDescription}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* ----//Position Description---- */}

              {/* ----Position Information---- */}
              <Grid item xs={12} marginTop={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight={700} >
                      2. Position Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    {/* input 3 */}
                    <FormControl
                      sx={{ mt: 3, ml: 3, width: "min(100% 279px)" }}
                      variant="outlined"
                    >

                      <TextField
                        id="outlined-number"
                        label="Expected Salary"
                        placeholder="Enter Expected Salary"
                        type="number"

                        onChange={(e) => {
                          var value = parseInt(e.target.value, 10);
                          if (value > max) value = max;
                          if (value < min) value = min;
                          setExpectedSalary(value);
                          setIsSalary(true);
                          if (IsName && IsDescription && !IsSalary && IsNoticPeriod && IsQuestions) {
                            setdisabled2(false)
                          }
                        }}
                        value={ExpectedSalary}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaRegMoneyBillAlt />
                            </InputAdornment>
                          ),

                        }}
                        inputProps={{ min, max }}
                        style={{ width: "250px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    {/* input 4 */}
                    <FormControl
                      sx={{ mt: 3, ml: 3, width: "min(100% 279px)" }}
                      variant="outlined"
                    >

                      <TextField
                        error={VALIDINPUTFEILDSNoticePeriod}
                        FormHelperTextProps={{
                          classes: {
                            root: helperTextStyles2.root
                          }
                        }}
                        id="outlined-required"
                        label="Notice Period"
                        onChange={onInputChange33}
                        value={noticePeriod}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdPersonOutline />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Notice Period"

                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "250px" }}
                        inputProps={{ maxlength: CHARACTER_LIMIT_ForNoticPeriod }}
                        helperText={!VALIDINPUTFEILDSNoticePeriod ? `${noticePeriod.length}/${CHARACTER_LIMIT_ForNoticPeriod}` : errorMessageNoticePeriod}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* ----// Position Information---- */}


              {/* ----3. Questions---- */}
              <Grid item xs={12} marginTop={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      3. Questions <p style={{ fontSize: "10px", marginTop: '0px', marginLeft: '10px', }}> *To Make the Question Open Ended Question Please Click the <CiLock style={{ color: "#7024C4" }} /></p>
                    </Typography>
                  </Grid>
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

                    }}
                  >
                    {/* ----Questions---- */}
                    <Grid container  >
                      {/* addbutton */}
                      <Grid item xs={12}>
                        <AiOutlinePlus onClick={() => addInput()} style={{
                          color: "#7024C4", cursor: "pointer"
                        }} />
                      </Grid>
                      {/* ----rows---- */}


                      {arr.map((item, i) => {
                        console.log(i)
                        return (

                          <Grid item xs={12} mt={1} key={arr[i].id} style={{ display: 'block', flexDirection: 'raw', marginBottom: "9px", margin: "20px " }} >
                            <Grid container spacing={3}  >
                              <Grid item xs={9} md={2} >

                                <TextField
                                  //  error={VALIDINPUTFEILDSQuestion}
                                  FormHelperTextProps={{
                                    classes: {
                                      root: helperTextStyles4.root
                                    }
                                  }}
                                  type="text"
                                  //  id="outlined-required"
                                  label="Question"
                                  value={item.questions}
                                  inputProps={{ "data-id": 0, "data-field-type": "questions", maxlength: CHARACTER_LIMIT_ForQuestion }}
                                  //  className='questions'
                                  onChange={onInputChangeForQuestion}
                                  id={i}
                                  placeholder="Enter Question"
                                  style={{ width: "200px" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                // inputProps={{ maxlength: CHARACTER_LIMIT_ForQuestion }}

                                // helperText={/*!VALIDINPUTFEILDSQuestion?`${LengthCounter22}/${CHARACTER_LIMIT_ForQuestion}`:*/errorMessageQuestion}
                                />
                              </Grid>
                              {/*This feild for the question parttttttt*/}

                              {/* <TextField
                      id="outlined-select-currency"
                      select
                      value={arr[i].questions}
                      //     onChange={handleChange}
                      id={i}
                      label="Questions"
                     // defaultValue="EUR"
                      className='Questions'
                      style={{
                        marginLeft: '25px',
                        width: "200px"
                      }}
                    >
                      {Questionnnn&&Questionnnn.map((option) => (
                        <MenuItem key={option.Question} value={option.Question} id={i} onClick={() => triggerQuestion(option.Question, i)}>
                          {option.Question}
                        </MenuItem>
                      ))}
                    </TextField>*/}
                              {/*This feild for the question parttttttt*/}
                              <Grid item xs={6} md={3}>
                                <TextField
                                  // error={VALIDINPUTFEILDSExpectedAnswer}
                                  FormHelperTextProps={{
                                    classes: {
                                      root: helperTextStyles5.root
                                    }
                                  }}
                                  type="text"
                                  // id="outlined-required"
                                  disabled={!item.SelectedToBeOpenQuestion ? disabled : !disabled}
                                  label=" Expected Answer"
                                  value={item.expectedAnswers}
                                  inputProps={{ "data-id": 0, "data-field-type": "expectedAnswers", maxlength: CHARACTER_LIMIT_ForAnswers }}
                                  // className='expectedAnswers'
                                  onChange={onInputChangeForAnswers}
                                  id={i}
                                  placeholder="Enter Expected Answer"
                                  style={{ marginLeft: '88px', width: "200px" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                // inputProps={{ maxlength: CHARACTER_LIMIT_ForAnswers }}

                                // helperText={/*!VALIDINPUTFEILDSExpectedAnswer?`${LengthCounter}/${CHARACTER_LIMIT_ForAnswers}`:*/errorMessageExpectedAnswer}
                                />
                              </Grid>
                              <Grid item xs={5} md={1}>
                                <FormControl fullWidth>
                                  <TextField
                                    id="outlined-select-currency"
                                    select
                                    value={item.value}
                                    //     onChange={handleChange}
                                    disabled={!item.SelectedToBeOpenQuestion ? disabled : !disabled}
                                    id={i}
                                    label="importance"
                                    defaultValue="EUR"
                                    className='imprtanceOfQ'
                                    style={{
                                      marginLeft: '110px',
                                      width: "200px"
                                    }}
                                  >
                                    {currencies.map((option) => (
                                      <MenuItem key={option.value} value={option.value} id={i} onClick={() => triggerImportance(option.value, i)}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </FormControl>
                              </Grid>

                              {
                                i ?
                                  <Grid item xs={1}>
                                    <BiTrash onClick={() =>
                                      removeFormFields(item.id)
                                    } style={{ marginTop: '6px', marginLeft: '250px', color: "#7024C4", cursor: "pointer" }} />
                                    {!item.SelectedToBeOpenQuestion ? <CiLock style={{ marginTop: '1%', marginLeft: '250px', color: "#7024C4", cursor: "pointer" }} onClick={() => { HandelOpenEndQuestion(item.id); handleTests(i) }} />
                                      : <CiUnlock style={{ marginTop: '1%', marginLeft: '250px', color: "gray", cursor: "pointer" }} onClick={() => { HandelOpenEndQuestion2(item.id); handleTests2(i) }} />
                                    }
                                  </Grid> : null
                              }
                            </Grid>
                          </Grid>

                        );
                      }
                      )
                      }
                      {/* --//rows--- */}
                    </Grid>

                    {/* -----//Questions----- */}
                  </Grid>
                </Grid>
              </Grid>
              {/* ---//3. Questions--- */}

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




                <button className="CancelAddPosition" style={{ cursor: "pointer" }} onClick={showAlertSuccess22}>Cancel</button>
                <button style={!disabled2 ? { cursor: "pointer", border: "none", padding: "7px 20px", borderRadius: "5px", color: "white", backgroundColor: "#14359F", width: "13%" } : { cursor: "pointer", border: "none", padding: "7px 20px", borderRadius: "5px", color: "white", backgroundColor: "gray", width: "13%" }} disabled={disabled2} onClick={handleSubmit}> Add Position </button>
                {/* <button className="AddPosition" style={{ cursor: "pointer" }} onClick={handleSubmit} >Add Position</button>*/}

              </Grid>
              {/* --- submit Button--- */}
            </Grid>
            {/* ----//content---- */}
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default PositionForm
