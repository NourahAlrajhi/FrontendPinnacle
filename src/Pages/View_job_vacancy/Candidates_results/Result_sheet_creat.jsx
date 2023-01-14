import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useParams } from "react-router-dom";
import { useRecruiterContext } from "../../../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';


function Result_sheet_creat({ exportBtnId, VacancyID }) {
  const { Recruiter } = useRecruiterContext()
  const [VACANCYNAME, setVACANCYNAME] = useState('')
  const [CandidatInfo, setCandidatInfo] = useState([{}])
  const [CandidatIdDocument, setCandidatIdDocument] = useState('')
  const [isClicked, setisClicked] = useState(false)



  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               
  } 

  const downloadExcel = (data) => {
    let CandidateALLINFO = [{}]
    var j = 0
    data && data.map((item, i) => {
      CandidateALLINFO[j] = {
        Candidate_Name: item.Candidate_Name,
        Candidate_Email: item.Candidate_Email,
        Candidate_Phone__Number:item.Candidate_Phone__Number,
        Result:item.Result
    }

      j = i + 1
    })
    const worksheet = XLSX.utils.json_to_sheet(CandidateALLINFO);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, `${VACANCYNAME}Results.xlsx`);
  };

  useEffect(() => {
    const fetchPosition = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/VacancyName/' + VacancyID, {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        setVACANCYNAME(json.title)
        console.log("data is takennnnnn in vacancy name")
      }
    }

    const fetchPosition2 = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/' + VacancyID, {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        setCandidatInfo(json.Candidate_Info)
        setCandidatIdDocument(json._id)

        console.log("data is takennnnnn")
      }
    }

    if (Recruiter) {
      fetchPosition()
      fetchPosition2()
    }
  }, [VacancyID, Recruiter])

  /*const GetExcelSheetForThisVacancy = async (e) => {
    console.log("Enterrrr GetExcelSheetForThisVacancy!")
    const CandidatInfooo = { CandidatInfo, VACANCYNAME }
    //https://backend-pinnacle.herokuapp.com/
    const response = await fetch('/api/Candidate/GetExcelSheetForThisVacancy/', {
      method: 'POST',
      body: JSON.stringify(CandidatInfooo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Recruiter.token}`,
      }
    })
    const json = await response.json()
    if (response.ok) {
      console.log("Excel file dowloaded!!")
    }

  }*/

  return (
    <Box className='Result_sheet_creat' sx={{ width: "100%", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <Typography variant='h4' >Candidates Results</Typography>
      {/* btn css in custom css */}
      <Button
        className="download-table-xls-button"
        style={{ background: "#14359F",  border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius:"8px",
        color:"white",
        padding: "0.8rem 1.5rem ",
        cursor: "pointer",
         }}
        //  table={exportBtnId}
        //  filename={VACANCYNAME+'Result'}
        //  sheet="tablexls"
        //   buttonText="Export"
        onClick={() => {downloadExcel(CandidatInfo);setisClicked(true)}}
      ><p style={{fontWeight: 600}}>Export</p></Button>
    </Box>
  )
}

export default Result_sheet_creat;