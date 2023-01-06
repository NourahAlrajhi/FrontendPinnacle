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

export default function Interview_result() {
  const { Recruiter } = useRecruiterContext()

  const { id2 } = useParams();
  const { id3 } = useParams();
  const [CandidateName, setCandidateName] = useState('')
  const [CandidatePhoneNumber, setCandidatePhoneNumber] = useState('')

  useEffect(() => {
    //console.log("formRows: ", Positions);
    const fetchPosition = async () => {
      const response = await fetch('/api/Candidate/CandidateInfo/' + id3 + '/' + id2, {
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
          }



        }

        )

      }
    }
    if (Recruiter) {
      fetchPosition()
    }
  }, [id2, id3, Recruiter])

  return (
    <>
      {/* ----Interview_result_box---- */}
      <Box className="Interview_result_box">
        {/* -user card- */}
        <Box className='user_card' sx={{ width: "100%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "20vh" }}>
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
        </Box>

        {/* --- Final Decision ---*/}
        <Box>
          <Typography variant='h6' >Final Decision</Typography>
          {/* passed */}
          <Box component="span" sx={{ display: "inline-block", margin: "10px 0", padding: "5px 15px", background: "#DEF8EE", fontWeight: "600", color: "#4AA785", borderRadius: "10px" }}>Passed</Box>
          {/* Not Attended */}
          {/* <Box component="span" sx={{display:"inline-block" ,margin:"10px 0", padding:"5px 15px" , background:"#DEF8EE"  , fontWeight:"600", color:"#4AA785" , borderRadius:"10px"}}>Not Attended </Box> */}
          {/* Failed */}
          {/* <Box component="span" sx={{display:"inline-block" ,margin:"10px 0", padding:"5px 15px" , background:"#DEF8EE"  , fontWeight:"600", color:"#4AA785" , borderRadius:"10px"}}>Failed</Box> */}
        </Box>

        {/* ---Detailed Analysis--- */}
        <Box mt={5}>
          <Typography variant='h6' mt={2}>Detailed Analysis</Typography>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" gap="5px" mt={2}>
            <Typography>Technical skills rating</Typography>
            <Box component="span" sx={{ background: "#A8C5DA", borderRadius: "8px", padding: "6px 30px", color: "white", fontWeight: "600" }}>60% </Box>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" gap="5px" mt={2}>
            <Typography>Soft skills rating</Typography>
            <Box component="span" sx={{ background: "#95A4FC", borderRadius: "8px", padding: "6px 30px", color: "white", fontWeight: "600" }}>60% </Box>
          </Stack>
        </Box>
        {/* ----skill slid frame--- */}
        <Stack direction="row" alignItems="center" mt={2} sx={{ width: "100%", height: "28px", background: "rgba(0, 0, 0, 0.05)", borderRadius: "8px", overflow: "hidden" }}>

          <Box component="span" sx={{ background: "#95A4FC", color: "white", fontWeight: "600", height: "100%", width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>30% </Box>
          <Box component="span" sx={{ background: "#A8C5DA", color: "white", fontWeight: "600", height: "100%", width: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}>40% </Box>
        </Stack>

        {/* ---range details--- */}
        <Box mx={2} mt={5} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-evenly", width: "98%" }}>
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
        </Box>

        {/* --- Interview Recording--- */}
        <Box mt={5}>
          <Typography variant='h6' > Interview Recording</Typography>
          <Box sx={{ display: "flex", placeContent: "center", margin: "3rem" }}>
            <video style={{ width: "min(500px , 98%)", margin: "auto", aspactRatio: "16 / 12", borderRadius: "10px" }} controls>
              <source src="../../../../images/movie.mp4" type="video/mp4" />
            </video>
          </Box>
        </Box>


      </Box>
    </>

  )
}
