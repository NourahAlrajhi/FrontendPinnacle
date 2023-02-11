import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import { usePositionsContext } from "../../../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

import FormControl from "@mui/material/FormControl";
import { Button, Divider, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Rating_chart from './Rating_chart';
import FilterWord_graph from './FilterWord_graph';

export const options = {

  responsive: true,
  plugins: {
      legend: {
          display: false,
          position: 'bottom',
      },

      title: {
          display: false,
          text: 'Chart.js Bar Chart',
      },
      layout: {
          padding: 50
      },


  },
  scales: {
      x: {
          beginAtZero: true,
          grid: {
              color: 'transparent',

          }
      },
      y: {
          border: {
              display: false
          },
      }
  }

};
const labels = ['Filter Words'];


export const options2 = {
  responsive: true,
  plugins: {
      legend: {
          display: false,
          position: 'top',
      },
      title: {
          display: false,
          text: 'Chart.js Bar Chart',
      },
      layout: {
          padding: 50
      },

  },
  scales: {
      x: {
          beginAtZero: true,
          grid: {
              color: 'transparent',

          }
      },
      y: {
          border: {
              display: false
          },

      }
  }

};
const labels2 = ['Answers Similarity'];

export default function Interview_result() {
  const { Recruiter } = useRecruiterContext()


  const { id2 } = useParams();
  const { id3 } = useParams();
  const { id4 } = useParams()
  const [CandidateName, setCandidateName] = useState('')
  const [CandidatePhoneNumber, setCandidatePhoneNumber] = useState('')
  const [CandidateResultr, setCandidateResultr] = useState('')
  const [CandidatePercentageResult, setCandidatePercentageResult] = useState(0.0)
  const [CandidatePercentageResultList, setCandidatePercentageResultList] = useState([])

  const [FillerWordsNumber, setFillerWordsNumber] = useState([])
  const [FillerWordsWORDS, setFillerWordsWORDS] = useState([''])


  const [CandidateChoosenPercentage, setCandidateChoosenPercentage] = useState(0.0)
  const [CandidateChoosenPercentageFiller, setCandidateChoosenPercentageFiller] = useState(0.0)
  const [CandidateChoosenPercentageFillerWord, setCandidateChoosenPercentageFillerWord] = useState('')



  const [CandidateInterview, setCandidateInterview] = useState([{}])
  const [QUESTIONS, setQUESTIONS] = useState([{}])
  const [SelectedRecord, setSelectedRecord] = useState('')

  const [ChooseOneQuestion, setChooseOneQuestion] = useState(true)

  const data1 = {
    labels: labels,

    datasets: [{
        label: 'Applicants per Open Vacancy',
        data: [CandidateChoosenPercentageFiller],
        backgroundColor: [
            '#95A4FC',
        ],
        borderRadius: 10,
        barPercentage: 0.1,
    }],

};


const dat2 = {
  labels: labels2,
  datasets: [{
      label: 'Applicants per Open Vacancy',
      data: [CandidateChoosenPercentage],
      backgroundColor: [
          '#b1e2fe',
      ],
      borderRadius: 10,
      barPercentage: 0.1,
  }]
};

  // Create and configure your Cloudinary instance.
  /* cloudinary.config({
      cloud_name: "ddkx3lmtt",
      api_key: "762496359684771",
      api_secret: "bWNYJYSFyDmkE__trELFtXPy7jQ"
  })*/
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddkx3lmtt"
    }
  });

  useEffect(() => {
    //console.log("formRows: ", Positions);
    const fetchPosition = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/CandidateInfo/' + id3 + '/' + id2, {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        json.Candidate_Info && json.Candidate_Info.map((item, i) => {
          console.log(`${item.id}`)

          if (item.id == id3) {
            console.log("enetr the condition")
            console.log(item.Candidate_Name)
            console.log(item.Candidate_Phone__Number)
            setCandidateName(item.Candidate_Name)
            setCandidatePhoneNumber(item.Candidate_Phone__Number)
            setCandidateResultr(item.Result)
            setCandidatePercentageResult(item.ResultPersentage)
            setCandidateInterview(item.RECORDS)
            setCandidatePercentageResultList(item.SpecificResultPersentage)
            setFillerWordsNumber(item.FillerWords)
            setFillerWordsWORDS(item.FillerWordsWords)

          }



        }

        )

      }
    }


    const fetchVacancyInfo = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/EnetrVacancyInfoForeQuestion/' + id4, {
      })
      const json = await response.json()
      if (response.ok) {
        console.log("Enter Question page to get vacancy infoooooooooooormationnnnnn")
        //  setVacancyQuestion(json.Position)
        console.log(json.Position)


        json.Position && json.Position.map((item, i) => {
          setQUESTIONS(item.arr)

          console.log(item.arr)

        })
      }
    }

    if (Recruiter) {
      fetchPosition()
      fetchVacancyInfo()
    }
  }, [id2, id3, Recruiter])


  const OnChoosenQuestion = async (ID, INDEX) => {
    setChooseOneQuestion(false)
    if (!Recruiter) {
      return
    }
    CandidateInterview && CandidateInterview.map((item, i) => {
      if (item.QuestionAndAnswerID == ID) {
        setSelectedRecord(cld.video(item.publicId))
        setCandidateChoosenPercentage(CandidatePercentageResultList[INDEX])
        setCandidateChoosenPercentageFiller(FillerWordsNumber[INDEX])
        setCandidateChoosenPercentageFillerWord(FillerWordsWORDS[INDEX])
        // setCandidatePercentageResultList(CandidatePercentageResultList[i])

      }

    })

  }


  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {/* ----Interview_result_box---- */}
      <Box className="Interview_result_box">
        {/* -user card- */}
        {/* <Box className='user_card' sx={{ width: "100%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "20vh" }}>
          <Card sx={{ width: "min(300px , 100%)", background: "#F7F9FB", border: "2px solid #1C1C1C", borderRadius: "16px" }}>
            <CardContent sx={{ display: "flex" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box>
                  <AccountCircleIcon sx={{ height: "50px", width: "50px", color: "gray" }} />
                </Box>
                <Box>
                  <Typography variant='h6'>
                    {CandidateName}
                  </Typography>
                  <Typography variant='body1' sx={{ color: "#70768C", fontWeight: "600" }}>
                    {CandidatePhoneNumber}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box> */}

        {/* ----change---- */}
        <Box className='user_card' sx={{ width: { xs: "100%", lg: "90%" }, margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "20vh" }} >
          <Grid container>
            <Grid item xs={12} sm={6} lg={2} mt={2} sx={{ display: "flex", justifyContent: { xs: 'start', lg: "center" }, alignItems: "center" }}>
              {/* <img style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "-1rem 0 0 0" }} src="https://picsum.photos/200/300" alt="img" /> */}
              <AccountCircleIcon sx={{ height: "100px", width: "100px", color: "gray", margin: "-1.5rem 0 0 0" }} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} mt={2}>
              <Typography sx={{ background: "#EFF0F6", marginBottom: "10px", padding: "5px 1rem", borderRadius: "10px", display: "inline-block", fontWeight: "600" }}>Candidate Name</Typography>
              <Typography variant='subtitle2' sx={{ fontSize: "1.3rem", fontWeight: "600" }}>{CandidateName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} mt={2}>
              <Typography sx={{ background: "#EFF0F6", marginBottom: "10px", padding: "5px 1rem", borderRadius: "10px", display: "inline-block", fontWeight: "600" }}>Phone Number</Typography>
              <Typography variant='subtitle2' sx={{ fontSize: "1.3rem", fontWeight: "600" }}>{CandidatePhoneNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} mt={2}>
              <Typography sx={{ background: "#EFF0F6", marginBottom: "10px", padding: "5px 1rem", borderRadius: "10px", display: "inline-block", fontWeight: "600" }}>Final Decision</Typography> <br />
              {/* <Typography variant='subtitle2' sx={{ fontSize: "1.3rem", fontWeight: "600" }}>{CandidateName}</Typography> */}
              <Box component="span" sx={{ display: "inline-block", margin: "10px 0", padding: "5px 15px", background: CandidateResultr == "Passed" ? "#7BC9AC" : "#AE6EE0", fontWeight: "600", color: CandidateResultr == "Passed" ? "white" : "white", borderRadius: "10px" }}>{CandidateResultr} {CandidatePercentageResult}%</Box>
            </Grid>

          </Grid>
        </Box>
        {/* ----//chaage---- */}

        {/* --- Final Decision ---*/}
        {/* <Box> */}
        {/* <Typography variant='h6' >Final Decision</Typography> */}
        {/* passed */}
        {/* <Box component="span" sx={{ display: "inline-block", margin: "10px 0", padding: "5px 15px", background: CandidateResultr == "Passed" ? "#DEF8EE" : "red", fontWeight: "600", color: CandidateResultr == "Passed" ? "#4AA785" : "white", borderRadius: "10px" }}>{CandidateResultr} {CandidatePercentageResult}%</Box> */}
        {/* Not Attended */}
        {/* <Box component="span" sx={{display:"inline-block" ,margin:"10px 0", padding:"5px 15px" , background:"#DEF8EE"  , fontWeight:"600", color:"#4AA785" , borderRadius:"10px"}}>Not Attended </Box> */}
        {/* Failed */}
        {/* <Box component="span" sx={{display:"inline-block" ,margin:"10px 0", padding:"5px 15px" , background:"#DEF8EE"  , fontWeight:"600", color:"#4AA785" , borderRadius:"10px"}}>Failed</Box> */}
        {/* </Box> */}

        {/* ---Detailed Analysis--- */}
        {/* <Box mt={5}>
          <Typography variant='h6' mt={2}>Detailed Analysis</Typography>
          <Grid item xs={12}>

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
                label="Select A Question To View The Details"
                //defaultValue="EUR"
                className='imprtanceOfQ'
                style={{
                  width: "940px"
                }}
              >
                {QUESTIONS && QUESTIONS.map((option, index) => (
                  <MenuItem key={option.id} value={option.id} onClick={() => OnChoosenQuestion(option.id, index)}>
                    {option.questions}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

        </Box> */}

        {/* ----change---- */}
        <Box className='Detailed' sx={{ width: { xs: "100%", md: "80%" }, margin: "auto" }}>
        <Grid item xs={12} sx={{marginLeft: "-55px"}}>

<FormControl
  sx={{ mt: 3, ml: 3, width: "min(100% , 279px)" ,marginLeft:"1px"}}
  variant="outlined"
>

  <TextField
    id="outlined-select-currency"
    select
    // value={item.value}
    //     onChange={handleChange}
    //  id={i}
    label="Select A Question To View The Details"
    //defaultValue="EUR"
    className='imprtanceOfQ'
    style={{
      width: "940px"
    }}
  >
    {QUESTIONS && QUESTIONS.map((option, index) => (
      <MenuItem key={option.id} value={option.id} onClick={() => OnChoosenQuestion(option.id, index)}>
        {option.questions}
      </MenuItem>
    ))}
  </TextField>
</FormControl>
</Grid>
          <Typography variant='h6' my={2}>Detailed Analysis</Typography>
         
          <Grid container spacing={3}>
            {/* ---graph 1--- */}
            <Grid item xs={12} md={6} lg={5} sx={{marginLeft: "-5px"}}>
              {/* <Rating_chart DATA={CandidateChoosenPercentage}/> */}
              <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }}>
                <Bar options={options2} data={dat2} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px", marginTop: "1rem" }} />
            </Box>
              <Stack direction="row" alignItems="center" justifyContent="center" gap="5px" mt={2}>
                <Typography>Answers Similarity</Typography>
                <Box component="span" sx={{ background: "#b1e2fe", borderRadius: "8px", padding: "6px 30px", color: "white", fontWeight: "600" }}> {ChooseOneQuestion ? '0' : CandidateChoosenPercentage}% </Box>
              </Stack>
            </Grid>
            {/* ---//graph 1--- */}
            {/* ---graph 2--- */}
            <Grid item xs={12} md={6} lg={5} sx={{ margin: "auto" }}>
            <Box sx={{ backgroundColor: "#F7F9FB", borderRadius: "16px", padding: "1rem", }}>
                <Bar options={options} data={data1} style={{ display: "inline-block", minWidth: "100%", maxHeight: "400px", marginTop: "1rem" }} />
            </Box>
              {/* <FilterWord_graph DATA={CandidateChoosenPercentage}/> */}
              <Stack direction="row" alignItems="center" justifyContent="center" gap="5px" mt={2} >
                <Typography>Filler Words</Typography>
                <Box component="span" sx={{ background: "#95A4FC", borderRadius: "8px", padding: "6px 30px", color: "white", fontWeight: "600" }}>{ChooseOneQuestion ? '0' : `${capitalizeWords(CandidateChoosenPercentageFillerWord)}`}</Box>
              </Stack>
            </Grid>
            {/* ---//graph 2--- */}
          </Grid>
        </Box>
        {/* ----//change---- */}
        {/* ------------- */}

        {/* <Box mt={5} sx={{ position: "absolute" }}>

          <Stack direction="row" marginLeft="760px" alignItems="center" gap="5px" mt={2} >
            <Typography>Filler Words</Typography>
            <Box component="span" sx={{ background: "#95A4FC", borderRadius: "8px", padding: "6px 30px", color: "white", fontWeight: "600" }}>{ChooseOneQuestion ? '0' : CandidateChoosenPercentage}% </Box>
          </Stack>
        </Box> */}

        <Box sx={{ width: { xs: "100%", md: "80%" }, margin: "2rem auto" }}>

          <Typography variant='h6' my={2} sx={{ textAlign: "left" }}>Interview Recording</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" ,marginLeft: "-5px"}} >
            <AdvancedVideo style={{ width: "min(600px , 98%)", aspactRatio: "16 / 12", borderRadius: "10px" }} cldVid={SelectedRecord} controls />
          </Box>


          {/* <video style={{ width: "min(500px , 98%)", margin: "auto", aspactRatio: "16 / 12", borderRadius: "10px" }} controls>
<source src="../../../../images/movie.mp4" type="video/mp4" />
</video>*/}

        </Box>
        {/* ----skill slid frame---
        <Stack direction="row" alignItems="center" mt={2} sx={{ width: "100%", height: "28px", background: "rgba(0, 0, 0, 0.05)", borderRadius: "8px", overflow: "hidden" }}>

          <Box component="span" sx={{ background: "#95A4FC", color: "white", fontWeight: "600", height: "100%", width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>30% </Box>
          <Box component="span" sx={{ background: "#A8C5DA", color: "white", fontWeight: "600", height: "100%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}>40% </Box>
        </Stack> */}

        {/* ---range details--- */}
        {/* <Box mx={2} mt={5} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-evenly", width: "98%" }}>
          <Box sx={{ width: "45%" }}>
            <Typography component="body1" sx={{ fontWeight: "600", fontSize: "1.3rem" }}>Soft skills rating</Typography>
            <Stack direction="row" alignItems="center" mt={2} sx={{ width: "100%", height: "8px", background: "rgba(0, 0, 0, 0.05)", borderRadius: "8px", overflow: "hidden" }}>
              <Box component="span" sx={{ background: "#95A4FC", color: "white", fontWeight: "600", height: "100%", width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}> </Box>

            </Stack>
            <Typography component="body1" sx={{ textAlign: "right", display: "block", marginTop: "5px" }}>30%</Typography>
          </Box>
          <Box sx={{ width: "45%" }}>
            <Typography component="body1" sx={{ fontWeight: "600", fontSize: "1.3rem" }}>Technical skills rating</Typography>
            <Stack direction="row" alignItems="center" mt={2} sx={{ width: "100%", height: "8px", background: "rgba(0, 0, 0, 0.05)", borderRadius: "8px", overflow: "hidden" }}>
              <Box component="span" sx={{ background: "#A8C5DA", color: "white", fontWeight: "600", height: "100%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}> </Box>

            </Stack>
            <Typography component="body1" sx={{ textAlign: "right", display: "block", marginTop: "5px" }}>60%</Typography>
          </Box>
        </Box> */}

        {/* --- Interview Recording--- */}
        {/* <Box mt={5}>
          <Typography variant='h6' > Interview Recording</Typography>
          <Grid item xs={12}>
            {/* input 1 */}
        {/* <FormControl
              sx={{ mt: 3, ml: 3, width: "min(100% , 279px)" }}
              variant="outlined"
            >

              <TextField
                id="outlined-select-currency"
                select
                // value={item.value}
                //     onChange={handleChange}
                //  id={i}
                label="Select A Question To View The Record"
                //defaultValue="EUR"
                className='imprtanceOfQ'
                style={{
                  width: "940px"
                }}
              >
                {QUESTIONS && QUESTIONS.map((option,index) => (
                  <MenuItem key={option.id} value={option.id} onClick={() => OnChoosenQuestion(option.id,index)}>
                    {option.questions}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Box sx={{ display: "flex", placeContent: "center", margin: "3rem", overflow: "scroll" }}>


            <AdvancedVideo style={{ width: "min(500px , 98%)", margin: "auto", aspactRatio: "16 / 12", borderRadius: "10px" }} cldVid={SelectedRecord} controls /> */}



        {/* <video style={{ width: "min(500px , 98%)", margin: "auto", aspactRatio: "16 / 12", borderRadius: "10px" }} controls>
 <source src="../../../../images/movie.mp4" type="video/mp4" />
</video>*/}

        {/* </Box>
        </Box> */}


      </Box>
    </>

  )
}
