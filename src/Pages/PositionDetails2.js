// components
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../Hook/usePositionsContext"
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
import { useParams } from "react-router-dom";
//import { useNavigate } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { capitalize } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";

const inputArr = [
  {
    type: "text",
    id: 0,
    questions: "",
    expectedAnswers: "",
    imprtanceOfQ: ""

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

const PositionDetails2 = () => {
  const { id } = useParams();
  const { Recruiter } = useRecruiterContext()
  const [isShown, setIsShown] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [consumer, getConsumer] = useState([{}]);
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [noticePeriod, setnoticePeriod] = useState('')
  const [ExpectedSalary, setExpectedSalary] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  // const navigate = useNavigate();
  // const [status, setStatus] = useState(null);

  const triggerImportance = (VALUE, ID) => {
    console.log("----------------");
    console.log(VALUE);
    console.log(ID);
    console.log("----------------");
    getConsumer(s => {
      const newArr = s.slice();
      console.log("aaaaaaaaaaaaaaaaaaa222222222")
      newArr[ID].imprtanceOfQ = VALUE;
      return newArr;
    });
  }

  let removeFormFields = (i) => {
    let newFormValues = [...consumer];
    newFormValues.splice(i, 1);
    getConsumer(newFormValues)
  }

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
    console.log("Enterr addInput")

    getConsumer(s => {
      return [
        ...s,
        {
          type: "text",
          id: consumer.length + 1,
          questions: "",
          expectedAnswers: "",
          imprtanceOfQ: ""
        }
      ];
    });
  };
  const handleGameClick = (event) => {
    event.preventDefault();
    setDisabled(false);
    setIsShown(current => !current);

  }

  const handleCancelClick = async (event) => {
    event.preventDefault();
    setDisabled(true);
    setIsShown(current => !current);

    const response = await fetch('/api/Position/' + id, {
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




  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };



  const handleChange = e => {
    e.preventDefault();
    console.log("Enterr handleChangeediiittttt")
    const index = e.target.id;
    getConsumer(s => {
      const newArr = s.slice();
      if (e.target.className === "questions") {
        console.log("Enterr question")
        //   setquestions(e.target.value)
        newArr[index].questions = e.target.value;
      } if (e.target.className === "expectedAnswers") {
        //  setexpectedAnswers(e.target.value)
        newArr[index].expectedAnswers = e.target.value;
      } if (e.target.className === "imprtanceOfQ") {
        //  setimprtanceOfQ(e.target.value)
        newArr[index].imprtanceOfQ = e.target.value;
      }

      return newArr;
    });
  };


  const showAlertSuccess = () => {
    var msg = parse('<span>Position Updated Successfully!!</span>')
    confirmAlert({
      message: msg,
      buttons: []
    })
  }

  const handleUpdate = async (e) => {
    console.log("Enter beginingggggg handleUpdate")
    e.preventDefault()
    if (!Recruiter) {
      setError('You must be logged in')
      return
    }
    console.log("Enter beginingggggg")
    const Positionssss = { /*questions*//*expectedAnswers*/arr: consumer, description, name, noticePeriod,/* imprtanceOfQ,*/ ExpectedSalary }
    const response = await fetch('/api/Position/' + id, {
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

    }
  }


  useEffect(() => {
    console.log("formRows: ", consumer);
    const fetchPosition = async () => {
      const response = await fetch('/api/Position/' + id, {
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


              {/*  <form className="create" /*onSubmit={handleSubmit}*/}




              {/* ----Position Description---- */}
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography  fontWeight={700}>
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
                        id="outlined-required"
                        label="Position Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImProfile />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setname(e.target.value)}
                        value={capitalizeWords(name)}
                        disabled={disabled}
                        placeholder="Enter Position Name"
                        style={{
                          width: "250px"
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ----input 2---- */}
                    <TextField
                      id="outlined-multiline-static"
                      label="Job Description"
                      multiline
                      rows={4}
                      disabled={disabled}
                      onChange={(e) => setdescription(e.target.value)}
                      value={description}
                      placeholder="Enter Job Description"
                      sx={{ mt: 3, ml: 3, width: "min(90% ,559px)" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* ----//Position Description---- */}


              {/* <div className="Section1">
            <h3 style={{
              width: "250px", position: "absolute",
              left: "90px",
              top: "30px"
            }}>1. Position Description</h3>
            <TextField
              id="outlined-required"
              label="Position Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImProfile />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setname(e.target.value)}
              value={capitalizeWords(name)}
              disabled={disabled}
              placeholder="Enter Position Name"
              style={{
                width: "250px", position: "absolute",
                left: "90px",
                top: "80px",
                
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Job Description"
              multiline
              rows={4}
              disabled={disabled}
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              placeholder="Enter Job Description"
              style={{
                width: "250px", position: "absolute",
                left: "90px",
                top: "160px"
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </div>*/}

              {/* ----Position Information---- */}
              <Grid item xs={12} marginTop={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography  fontWeight={700}>
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
                        onChange={(e) => setExpectedSalary(e.target.value)}
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
                        id="outlined-required"
                        label="Notic Period"
                        onChange={(e) => setnoticePeriod(e.target.value)}
                        value={noticePeriod}
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

                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* ----// Position Information---- */}


              {/* <div className="Section1" style={{
            width: "250px", position: "absolute",
            left: "10px",
            top: "300px"
          }}>
            <h3 style={{
              width: "250px", position: "absolute",
              left: "90px",
              top: "30px"
            }}>2. Position Information</h3>
            <TextField
              id="outlined-number"
              label="Expected Salary"
              placeholder="Enter Expected Salary"
              type="number"
              disabled={disabled}
              onChange={(e) => setExpectedSalary(e.target.value)}
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
                width: "250px", position: "absolute",
                left: "90px",
                top: "80px"
              }}
            />
            <TextField
              id="outlined-required"
              label="Notic Period"
              onChange={(e) => setnoticePeriod(e.target.value)}
              value={noticePeriod}
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
                width: "250px", position: "absolute",
                left: "420px",
                top: "80px"
              }}
              InputLabelProps={{
                shrink: true,
              }}

            />
            </div>*/}



              {/* ----3. Questions---- */}
              <Grid item xs={12} marginTop={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      3. Questions
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
                    
                      {/* ----rows---- */}


                      {consumer && consumer.map((arr, i) => {
                        console.log(i)
                        return (

                          <Grid item xs={12} mt={1} key={consumer[i].id} style={{ display: 'block', flexDirection: 'raw', marginBottom: "7px", margin: "20px " }} >
                            <Grid container spacing={3}  >
                              <Grid item xs={9} md={2} >

                                <TextField
                                  type="text"
                                  //  id="outlined-required"
                                  label="Question"
                                  value={arr.questions}
                                  inputProps={{ "data-id": 0, "data-field-type": "questions" }}
                                  //  className='questions'
                                  onChange={handleChange}
                                  id={i}
                                  placeholder="Enter Question"
                                  disabled={disabled}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  style={{ width: "200px" }}

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
                                  type="text"
                                  disabled={disabled}
                                  // id="outlined-required"
                                  label=" Expected Answer"
                                  value={arr.expectedAnswers}
                                  inputProps={{ "data-id": 0, "data-field-type": "expectedAnswers" }}
                                  // className='expectedAnswers'
                                  onChange={handleChange}
                                  id={i}
                                  placeholder="Enter Expected Answer"
                                  style={{ marginLeft: '88px', width: "200px" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}

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
                                    disabled={disabled}
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
                                    } style={{ marginTop: '20px', marginLeft: '250px', color: "#7024C4", cursor: "pointer" }} />   </Grid> : null
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



              {/*  <div className="Section1" style={{
                width: "250px", position: "absolute",
                left: "10px",
                top: "460px",
                zIndex: "0"
              }}>
                <h3 style={{
                  width: "250px", position: "absolute",
                  left: "90px",
                  top: "30px"
                }}>3. Questions</h3>


                <Grid elevation={3} style={{
                  zIndex: '10', width: '330%', height: '239px', overflow: 'scroll', position: "absolute", top: "73px", left: "78px", radius: "20px", boxShadow: "0px 0px 5px lightgray",
                  borderRadius: "20px",
                  padding: "10px",
                  backgroundColor: "white"
                }} className="box">


                  {consumer && consumer.map((arr, i) => {
                    console.log(i)
                    return (

                      <div key={consumer[i].id} style={{ display: 'block', flexDirection: 'raw', marginBottom: "20px", margin: "20px " }}>
                        {
                          i && isShown ?
                            <BiTrash onClick={() =>
                              removeFormFields(arr.id)
                            } style={{ margin: "20px", color: "#7024C4", cursor: "pointer" }} /> : null
                        }

                        <TextField
                          type="text"
                          //  id="outlined-required"
                          label="Question"
                          value={arr.questions}
                          inputProps={{ "data-id": 0, "data-field-type": "questions" }}
                          //  className='questions'
                          onChange={handleChange}
                          id={i}
                          placeholder="Enter Question"
                          disabled={disabled}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />
                        <TextField
                          type="text"
                          disabled={disabled}
                          // id="outlined-required"
                          label=" Expected Answer"
                          value={arr.expectedAnswers}
                          inputProps={{ "data-id": 0, "data-field-type": "expectedAnswers" }}
                          // className='expectedAnswers'
                          onChange={handleChange}
                          id={i}
                          placeholder="Enter Expected Answer"
                          style={{ marginLeft: '20px' }}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />


                        <TextField
                          id="outlined-select-currency"
                          select
                          value={arr.imprtanceOfQ}
                          //     onChange={handleChange}
                          id={i}
                          disabled={disabled}
                          label="importance"
                          defaultValue="EUR"
                          className='imprtanceOfQ'
                          style={{
                            marginLeft: '25px',
                            width: "200px"
                          }}
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value} id={i} onClick={() => triggerImportance(option.value, i)}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>








                      </div>
                    );
                  }
                  )
                  }


                </Grid>
                </div>*/}

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
                    <button type="button" style={{ cursor: "pointer" , borderRadius: "5px",color: "white", backgroundColor: "#14359F",border: "none",width:"110px",height:"30px"}}> Edit </button></Link>
                )}






                {isShown && (
                  <div>
                    <button className="AddPosition" style={{ cursor: "pointer" }} onClick={handleUpdate}> Save </button>
                    <button className="CancelAddPosition" style={{ cursor: "pointer" }} onClick={handleCancelClick}> cancel </button>
                    <AiOutlinePlus style={{
                      width: "250px", position: "absolute",
                      left: "-100px",
                      top: "20px",
                      color: "#7024C4", cursor: "pointer"
                    }} onClick={() => addInput()} />


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

export default PositionDetails2