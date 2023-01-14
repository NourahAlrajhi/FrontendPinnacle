import * as React from 'react';
import Box from '@mui/material/Box';
// -----
import './Candidates_results_main.css'
import { useParams } from "react-router-dom";
import Result_sheet_creat from './Result_sheet_creat';
import Result_table from './Result_table';

const exportBtnId = "test-table-xls-button"

function Candidates_results_main() {
  const { id } = useParams();

  return (
    <>
      <Box className='Candidates_result_main_cotainer'>
        {/* ---Result_sheet_creat--- */}
        <Result_sheet_creat exportBtnId={exportBtnId} VacancyID={id}/>
        {/* ---Result_table--- */}
        <Result_table exportBtnId={exportBtnId} VacancyID={id}/>
      </Box>
    </>
  )
}

export default Candidates_results_main;