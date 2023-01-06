import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Common_table_dropdown from "../../Table_components/Common_table_dropdown";
import Common_table_button from "../../Table_components/Common_table_button";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PersonIcon from '@mui/icons-material/Person';
import Active_vacancy_table_search_bar from "../../Table_components/table_search_bar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useRecruiterContext } from "../../../Hook/UseRecruiterContext"
import Button from "@mui/material/Button";
// -------table component----------------
//import { IconContext } from './iconContext';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import { shadows } from '@mui/system';
import Grid from '@mui/material/Grid';
// icon--
import AddIcon from '@mui/icons-material/Add';
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePositionsContext } from "../../../Hook/usePositionsContext"
import { useVacancyContext } from "../../../Hook/UseVacancy"

import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import LongMenu2 from '../../../component/ForMoreMenuJobVacancy'
import { GrShare } from "react-icons/gr";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", "+966123456789", "Passed"),
  createData("Frozen yoghurt", "+966123456789", "Failed"),
  createData("Frozen yoghurt", "+966123456789", "Passed"),
  createData("Frozen yoghurt", "+966123456789", "Not Attended"),
  createData("Frozen yoghurt", "+966123456789", "Passed"),

];


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function Result_table({ exportBtnId, VacancyID }) {


  const { Recruiter } = useRecruiterContext()
  const [CandidatInfo, setCandidatInfo] = useState([{}])
  const [CandidatIdDocument, setCandidatIdDocument] = useState('')
  const [CandidatePhone, setCandidatePhone] = useState('')
  const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const [filteredProducts, setFilteredProducts] = useState([]);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  useEffect(() => {
    console.log("formRows: ", CandidatInfo);
    const fetchPosition = async () => {
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
    }
  }, [VacancyID, Recruiter])


  // your search event handler
  function search(searchTerm) {
    // update search value
    setSearchInput(searchTerm);

    const filtered = CandidatInfo.filter(
      product =>
        product.Candidate_Name
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().toLowerCase()),
    );

    // set filtered products in state
    setFilteredProducts(filtered);
  }




  // -----popover function------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  const iddd = open ? "simple-popover" : undefined;
  // ----//popover function------

  let navigate = useNavigate()
  return (
    <>
      {/* table_main_container => add custom css */}
      <Box className="table_main_container" >
        {/*---bar--- */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ background: "transparent", color: "#222", boxShadow: "none" }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {/* Active Jop Vacancies */}
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => search(e.target.value)}


                />
              </Search>
            </Toolbar>
          </AppBar>        </Box>
        {/* --table-- */}
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              background: "transparent",
              color: "#222",
              margin: "1rem auto", overflow: "auto", boxShadow: "none",
            }}
          >
            <Table aria-label="simple table" id={exportBtnId}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>
                    <Common_table_button btnText={"Candidate Name"} />
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Common_table_button btnText={"Phone Number"} />
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Common_table_dropdown btnText={"Result"} />
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Common_table_dropdown btnText={"Interview Results"} />
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {searchInput ? (
                  filteredProducts && filteredProducts.map((item, i) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:nth-of-type(odd), &:nth-of-type(even)": {
                          border: 0,
                          borderBottom: 0,
                        },
                      }}
                    >


                      <TableCell align="left" sx={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "10%", border: 0 }}>
                        <PersonIcon />
                        {item.Candidate_Name}
                      </TableCell>
                      <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}> {item.Candidate_Phone__Number}</TableCell>
                      <TableCell align="left" sx={{ paddingLeft: "8%", border: 0 }}>
                        Pass
                      </TableCell>
                      <TableCell align="left" sx={{ paddingLeft: "10%", border: 0, cursor: "pointer" }} onClick={() => navigate(`/Dashboard/View_job_vacancy_main/Candidates_results_main/Interview_result/${item.id}/${CandidatIdDocument}`)}>
                        <GrShare />
                      </TableCell>
                    </TableRow>
                  )
                  )
                  // loop over filtered products, so only searched products are shown
                ) : CandidatInfo && CandidatInfo.map((item, i) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:nth-of-type(odd), &:nth-of-type(even)": {
                        border: 0,
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell align="left" sx={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "10%", border: 0 }}>
                      <PersonIcon />
                      {item.Candidate_Name}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>{item.Candidate_Phone__Number}</TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "8%", border: 0 }}>
                      Pass
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0, cursor: "pointer" }} onClick={() => navigate(`/Dashboard/View_job_vacancy_main/Candidates_results_main/Interview_result/${item.id}/${CandidatIdDocument}`)}>

                      <GrShare size={20} color="#14359F" />
                    </TableCell>
                  </TableRow>
                )
                )
                }

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}
