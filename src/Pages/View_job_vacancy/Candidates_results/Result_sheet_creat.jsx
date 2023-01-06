import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Result_sheet_creat(props) {
  return (
    <Box className='Result_sheet_creat' sx={{ width: "100%", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <Typography variant='h4'>Candidates Results</Typography>
      {/* btn css in custom css */}
      <ReactHTMLTableToExcel
        className="download-table-xls-button"
        table={props.exportBtnId}
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export"

      />
    </Box>
  )
}

export default Result_sheet_creat;