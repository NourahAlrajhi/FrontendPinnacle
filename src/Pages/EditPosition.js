// components
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../Hook/usePositionsContext"
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { Button, Divider, Grid, Typography } from "@mui/material";
import { CiLock, CiUnlock } from "react-icons/ci";
import InputAdornment from '@mui/material/InputAdornment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Paper from '@mui/material/Paper';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
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
import { useParams } from "react-router-dom";
//import { useNavigate } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import FormControl from "@mui/material/FormControl";



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

const inputArr = [
  {
    type: "text",
    id: 0,
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

const EditPosition = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [isShown, setIsShown] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [consumer, getConsumer] = useState([{}]);
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [noticePeriod, setnoticePeriod] = useState('')
  const [ExpectedSalary, setExpectedSalary] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const CHARACTER_LIMIT_ForName = 120;
  const CHARACTER_LIMIT_ForNoticPeriod = 120;
  const CHARACTER_LIMIT_ForDescription = 300;
  const CHARACTER_LIMIT_ForQuestion = 60;
  const CHARACTER_LIMIT_ForAnswers = 60;
  const min = 0;
  const max = 25000;
  const [LengthCounter, setLengthCounter] = useState(0);
  const [LengthCounter22, setLengthCounter22] = useState(0);
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  let removeFormFieldsss = (removeIndex) => {
    console.log(removeIndex)
    let newFormValues = [...consumer];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === removeIndex);
    console.log(deleteTodoIndex)
    // const result = arr.filter(playlist => playlist.id !== removeIndex)
    newFormValues.splice(deleteTodoIndex, 1);
    getConsumer([...newFormValues])

  }

  const addInput = () => {
    if (consumer.length != 10) {
      console.log("Enterr addInput")
      getConsumer(s => {
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

  const handleGameClick = (event) => {
    event.preventDefault();
    setDisabled(false);
    setIsShown(current => !current);
  }


  const triggerImportance = (VALUE, ID) => {
    // setImportance(e.target.value)
    console.log("----------------");
    console.log(VALUE);
    // const index = e.target.id;
    console.log(ID);
    console.log("----------------");
    getConsumer(s => {
      const newArr = s.slice();
      console.log("aaaaaaaaaaaaaaaaaaa222222222")
      newArr[ID].imprtanceOfQ = VALUE;
      return newArr;
    });
  }

  const showAlertSuccess22 = (event) => {
    event.preventDefault()
    console.log('enterrrrrrrrrrr cancel')

    var msg = parse('<h3 style="text-align: center">Are you sure you want to Discard position changes?</h3>')
    confirmAlert({
      message: msg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleCancelClick(event),

        },
        {
          label: 'No',
          onClick: () => setAnchorEl(null)
        }

      ]
    })

  }



  const handleCancelClick = async (event) => {
    event.preventDefault();
    setDisabled(true);
    setIsShown(current => !current);
    setdescription(description)
    setnoticePeriod(noticePeriod)
    setExpectedSalary(ExpectedSalary)
    setname(name)
    getConsumer(consumer);
    console.log("data is takennnnnn")
    navigate(`/PositionDetails2/${id}`);
  }






  const handleChange = e => {
    e.preventDefault();
    setLengthCounter(LengthCounter+1)
    console.log("Enterr handleChangeediiittttt")
    if(e.target.value == ""){
      setLengthCounter(0)
    }
    const index = e.target.id;
    getConsumer(s => {
      const newArr = s.slice();
      if (e.target.dataset.fieldType === "questions") {
        console.log("Enterr question")
        newArr[index].questions = e.target.value;
      } if (e.target.dataset.fieldType === "expectedAnswers") {
        console.log("Enterr expectedAnswers")
        newArr[index].expectedAnswers = e.target.value;
      } if (e.target.className === "imprtanceOfQ") {
        newArr[index].imprtanceOfQ = e.target.value;
      }

      return newArr;
    });
  };


  const showAlertSuccess = () => {
    var msg = parse('<h3 style="text-align: center">Position Details Edited Successfully</h3>')
    confirmAlert({
      message: msg,
      buttons: []
    })
  }


  const showAlertSuccess33 = (error) => {
    var msg = parse(`<h3 style="text-align: center">${error}</h3>`)
    confirmAlert({
      message: msg,
      buttons: []
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log("Enter beginingggggg handleUpdate")

    if (!Recruiter) {
      setError('You must be logged in')
      return
    }
    { error && showAlertSuccess33(error) }
    console.log("Enter beginingggggg")
    const Positionssss = { /*questions*//*expectedAnswers*/arr: consumer, description, name, noticePeriod,/* imprtanceOfQ,*/ ExpectedSalary }
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position/' + id, {
      method: 'PATCH',
      body: JSON.stringify(Positionssss),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Recruiter.token}`,
      }
    })
    const json = await response.json()
    console.log("Enter beginingggggg2")

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      console.log("Enter beginingggggg3")
      setError(null)
      setEmptyFields([])
      //  navigate("/PositionList")
      setDisabled(true);
      setIsShown(current => !current);
      showAlertSuccess()
      navigate(`/PositionDetails2/${id}`);
    }


  }


  useEffect(() => {
    console.log("formRows: ", consumer);
    const fetchPosition = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Position/' + id, {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        setdescription(json.description)
        setnoticePeriod(json.noticePeriod)
        setExpectedSalary(json.ExpectedSalary)
        setname(json.name)
        getConsumer(json.arr);
        console.log("data is takennnnnn")
      }
    }
    if (Recruiter) {
      fetchPosition()
    }
  }, [id, Recruiter])


  function handleTests(index) {
    let updateData = consumer.map((item, i) => {
      return index === i ? { ...item, SelectedToBeOpenQuestion: !item.SelectedToBeOpenQuestion } : item;
    });
    getConsumer(updateData);
  }

  function handleTests2(index) {
    let updateData = consumer.map((item, i) => {
      return index === i ? { ...item, SelectedToBeOpenQuestion: !item.SelectedToBeOpenQuestion } : item;
    });
    getConsumer(updateData);
  }

  const HandelOpenEndQuestion = (removeIndex) => {

    const index = removeIndex;
    console.log(index)

    let newFormValues = [...consumer];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === index);
    newFormValues[deleteTodoIndex].expectedAnswers = "Open Ended Question"
    newFormValues[deleteTodoIndex].imprtanceOfQ = "Open Ended Question"
  }

  const HandelOpenEndQuestion2 = (removeIndex) => {

    const index = removeIndex;
    console.log(index)

    let newFormValues = [...consumer];
    const deleteTodoIndex = newFormValues.findIndex((item) => item.id === index);
    newFormValues[deleteTodoIndex].expectedAnswers = ""
    newFormValues[deleteTodoIndex].imprtanceOfQ = ""
  }
  const helperTextStyles = useHelperTextStyles();
  const helperTextStyles2 = useHelperTextStyles2()
  const helperTextStyles3 = useHelperTextStylesForDescription()
  const helperTextStyles4 =  useHelperTextStylesForQuestion()
  const helperTextStyles5 =  useHelperTextStylesForAnswers()

  const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
  const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)


  const onInputChange = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setname(e.target.value)
    }
  };


  const onInputChange22 = (e) => {
    const { value } = e.target;
    console.log(value)
    if (isLetters2(value)) {
      console.log("lllllllllllollllppppp")
      setdescription(e.target.value)
    }
  };


  const onInputChange33 = (e) => {
    const { value } = e.target;
    if (isLetters2(value)) {
      setnoticePeriod(e.target.value)
    }
  };

  const onInputChangeForQuestion = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setLengthCounter22(LengthCounter22+1)
      const index = e.target.id;
      if(e.target.value == ""){
        setLengthCounter22(0)
      }
      getConsumer(s => {
        const newArr = s.slice();
        if (e.target.dataset.fieldType === "questions") {
          console.log("Enterr question")
          newArr[index].questions = e.target.value;
        } if (e.target.dataset.fieldType === "expectedAnswers") {
          console.log("Enterr expectedAnswers")
          newArr[index].expectedAnswers = e.target.value;
        } if (e.target.className === "imprtanceOfQ") {
          newArr[index].imprtanceOfQ = e.target.value;
        }

        return newArr;
      });
    }
  };

  const onInputChangeForAnswers = (e) => {
    const { value } = e.target;
    if (isLetters2(value)) {
      setLengthCounter(LengthCounter+1)
      const index = e.target.id;
      if(e.target.value == ""){
        setLengthCounter(0)
      }
      getConsumer(s => {
        const newArr = s.slice();
        if (e.target.dataset.fieldType === "questions") {
          console.log("Enterr question")
          newArr[index].questions = e.target.value;
        } if (e.target.dataset.fieldType === "expectedAnswers") {
          console.log("Enterr expectedAnswers")
          newArr[index].expectedAnswers = e.target.value;
        } if (e.target.className === "imprtanceOfQ") {
          newArr[index].imprtanceOfQ = e.target.value;
        }

        return newArr;
      });
    }
  };


  return (
    <>
      <form className="create" /*onSubmit={handleSubmit}*/>
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
                        onChange={onInputChange}
                        value={capitalizeWords(name)}
                        disabled={disabled}
                        placeholder="Enter Position Name"
                        placeholder="Enter Position Name"
                        style={{
                          width: "250px"
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ maxlength: CHARACTER_LIMIT_ForName }}

                        helperText={`${name.length}/${CHARACTER_LIMIT_ForName}`}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ----input 2---- */}
                    <TextField
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextStyles3.root
                        }
                      }}
                      id="outlined-multiline-static"
                      label="Job Description"
                      multiline
                      onChange={onInputChange22}
                      rows={4}
                      disabled={disabled}
                   
                      value={description}
                      placeholder="Enter Job Description"
                      sx={{ mt: 3, ml: 3, width: "min(90% ,559px)" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ maxlength: CHARACTER_LIMIT_ForDescription }}

                      helperText={`${description.length}/${CHARACTER_LIMIT_ForDescription}`}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* ----Position Information---- */}
              <Grid item xs={12} marginTop={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
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
                        disabled={disabled}
                        onChange={(e) => {
                          var value = parseInt(e.target.value, 10);
                          if (value > max) value = max;
                          if (value < min) value = min;
                          setExpectedSalary(value)
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
                        style={{
                          width: "250px"
                        }}
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
                        FormHelperTextProps={{
                          classes: {
                            root: helperTextStyles2.root
                          }
                        }}
                        id="outlined-required"
                        label="Notic Period"
                        onChange={onInputChange33 }
                        value={capitalizeWords(noticePeriod)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdPersonOutline />
                            </InputAdornment>
                          ),
                        }}
                        disabled={disabled}
                        placeholder="Enter Notic Period"
                        style={{
                          width: "250px"
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ maxlength: CHARACTER_LIMIT_ForNoticPeriod }}

                        helperText={`${noticePeriod.length}/${CHARACTER_LIMIT_ForNoticPeriod}`}

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
                        {isShown && (<AiOutlinePlus style={{

                          color: "#7024C4", cursor: "pointer"
                        }} onClick={() => addInput()} />
                        )}
                      </Grid>
                      {/* ----rows---- */}


                      {consumer && consumer.map((arr, i) => {
                        console.log(i)
                        return (

                          <Grid item xs={12} mt={1} key={consumer[i].id} style={{ display: 'block', flexDirection: 'raw', marginBottom: "6px", margin: "20px " }} >
                            <Grid container spacing={3}  >
                              <Grid item xs={9} md={2} >

                                <TextField
                                   FormHelperTextProps={{
                                    classes: {
                                      root: helperTextStyles4.root
                                    }
                                  }}
                                  type="text"
                                  //  id="outlined-required"
                                  label="Question"
                                  value={arr.questions}
                                  inputProps={{ "data-id": 0, "data-field-type": "questions",maxlength: CHARACTER_LIMIT_ForQuestion  }}
                                  //  className='questions'
                                  onChange={onInputChangeForQuestion}
                                  id={i}
                                  placeholder="Enter Question"
                                  disabled={disabled}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  style={{ width: "200px" }}
                                  // helperText={`${arr.questions.length}/${CHARACTER_LIMIT_ForQuestion}`}
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
                                     FormHelperTextProps={{
                                      classes: {
                                        root: helperTextStyles5.root
                                      }
                                    }}
                                  type="text"
                                  disabled={!arr.SelectedToBeOpenQuestion ? disabled : !disabled}
                                  // id="outlined-required"
                                  label=" Expected Answer"
                                  value={arr.expectedAnswers}
                                  inputProps={{ "data-id": 0, "data-field-type": "expectedAnswers",maxlength: CHARACTER_LIMIT_ForAnswers }}
                                  // className='expectedAnswers'
                                  onChange={onInputChangeForAnswers}
                                  id={i}
                                  placeholder="Enter Expected Answer"
                                  style={{ marginLeft: '88px', width: "200px" }}

                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  // helperText={`${arr.expectedAnswers.length}/${CHARACTER_LIMIT_ForAnswers}`}
                                />

                              </Grid>
                              <Grid item xs={5} md={1}>
                                <FormControl fullWidth>
                                  <TextField
                                    id="outlined-select-currency"
                                    select
                                    value={arr.imprtanceOfQ}
                                    //     onChange={handleChange}
                                    id={i}
                                    disabled={!arr.SelectedToBeOpenQuestion ? disabled : !disabled}
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
                                i && isShown ?
                                  <Grid item xs={1}>
                                    <BiTrash onClick={() =>
                                      removeFormFieldsss(arr.id)
                                    } style={{ marginTop: '6px', marginLeft: '250px', color: "#7024C4", cursor: "pointer" }} />
                                    {!arr.SelectedToBeOpenQuestion ? <CiLock style={{ marginTop: '1%', marginLeft: '250px', color: "#7024C4", cursor: "pointer" }} onClick={() => { HandelOpenEndQuestion(arr.id); handleTests(i) }} />
                                      : <CiUnlock style={{ marginTop: '1%', marginLeft: '250px', color: "gray", cursor: "pointer" }} onClick={() => { HandelOpenEndQuestion2(arr.id); handleTests2(i) }} />
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

                {!isShown && (
                  <Link to={`/EditPosition/${id}`} style={{ textDecoration: 'none', color: "black" }}>
                    <button type="button" className="AddPosition"> Edit </button></Link>
                )}






                {isShown && (
                  <div>
                    <button className="CancelAddPosition" style={{ cursor: "pointer", borderRadius: "5px", color: "14359F", backgroundColor: "#F7F9FB", border: "none", width: "110px", height: "30px", borderColor: "#14359F", margin: "20px" }} onClick={showAlertSuccess22}> Cancel </button>
                    <button className="AddPosition" style={{ cursor: "pointer", borderRadius: "5px", color: "white", backgroundColor: "#14359F", border: "none", width: "110px", height: "30px" }} onClick={handleUpdate}> Save </button>


                  </div>
                )}
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

export default EditPosition