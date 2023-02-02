import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Common_table_button from "../Table_components/Common_table_button";
import Common_table_dropdown from "../Table_components/Common_table_dropdown";
import Active_vacancy_table_search_bar from "../Table_components/table_search_bar";
import { useNavigate } from "react-router";
import Option_button from "../Table_components/Option_button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from "@mui/material/Button";
// -------table component----------------
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import { shadows } from '@mui/system';
import Grid from '@mui/material/Grid';
// icon--
import AddIcon from '@mui/icons-material/Add';
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useVacancyContext } from "../../Hook/UseVacancy"

import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import LongMenu2 from '../../component/ForMoreMenuJobVacancy'


import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 200, "12/3/2022"),
  createData("Ice cream sandwich", 237, 900, "2/3/2022"),
  createData("Eclair", 262, 160, "2/3/2022"),
  createData("Cupcake", 305, 347, "2/3/2022"),
  createData("Gingerbread", 356, 160, "2/3/2022"),
  createData("Cupcake", 305, 37, "2/3/2022"),
  createData("Gingerbread", 356, 160, "2/3/2022"),
  createData("Cupcake", 305, 373, "2/3/2022"),
  createData("Gingerbread", 356, 160, "2/3/2022"),
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

export default function Active_vacancy_table(props) {
  let CandidateNumber = [];
  var j;
  const { Vacancy, dispatchhh } = useVacancyContext()
  const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [RecruiterVacancy, setRecruiterVacancy] = useState(Recruiter.Vavancy);

  // ---select options--
  const [Option, setOption] = React.useState("");

  const OptionSelect = (event) => {
    setOption(event.target.value);
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  useEffect(() => {

    console.log("formRows: ", Vacancy);
    const fetchPosition = async () => {
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/List', {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        dispatchhh({ type: 'SET_Vacancy', payload: json })
        console.log("===========")
        console.log(RecruiterVacancy)
        console.log("===========")
        console.log(RecruiterVacancy.length)
        console.log(CandidateNumber)
        GetClosedVacancy()
     
          setVacancyResult(json)
        

      }

    }


    if (Recruiter) {
      fetchPosition()
    }
  }, [dispatchhh, Recruiter])



  const GetClosedVacancy = async (e) => {
    console.log("Enterrrr GetClosedVacancy")
    let VacancyClosed = ['']
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/VacancyExpired', {
      headers: { 'Authorization': `Bearer ${Recruiter.token}` },
    })
    const jsonnn = await response.json()

    if (response.ok) {
      var j = 0
      jsonnn && jsonnn.map((item, i) => {
        console.log(`${item._id}`)

        VacancyClosed[j] = item._id


        j = i + 1
      })

      console.log(VacancyClosed)


      const VacancyList = { VacancyClosed }
      //POST
      console.log(VacancyList)

      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/VacancyStatusToClosed', {
        method: 'PATCH',
        body: JSON.stringify(VacancyList),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Recruiter.token}`,
        }
      })
      const json2 = await response.json()


      if (response.ok) {
        console.log("Vacancy Updated Closed")

      }

    }


  }





  // your search event handler
  function search(searchTerm) {
    // update search value
    setSearchInput(searchTerm);

    const filtered = Vacancy.filter(
      product =>
        product.title
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
  const id = open ? "simple-popover" : undefined;
  // ----//popover function------

  let navigate = useNavigate();

  const [VacancyResult, setVacancyResult] = useState([{}]);
  const [yearDirection, setYearDirection] = useState("asc");
  const [IsAskForSort, setIsAskForSort] = useState(false);  

  const sortByYear = () => {
    console.log("Enterrrrrrrrrrr here")
    setIsAskForSort(true)
    if (yearDirection === "asc") {
      setVacancyResult(
        VacancyResult.slice().sort((a, b) => {
          console.log(a.linkExpTime);
          return new Date(b.linkExpTime) - new Date(a.linkExpTime);
        })
      );
      setYearDirection("desc");
    }
  
    if (yearDirection === "desc") {
      setVacancyResult(
        VacancyResult.slice().sort((a, b) => {
          console.log(a.linkExpTime);
          return new Date(a.linkExpTime) - new Date(b.linkExpTime);
        })
      );
      setYearDirection("asc");
    }
  };

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
                {/* {props.barText} */}
           Active Jop Vacancies 
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
          </AppBar>

        </Box>
        {/* --table-- */}

        <TableContainer
          component={Paper}
          sx={{
            background: "transparent",
            color: "#222",
            width: "99%", margin: "1rem auto", overflow: "auto", boxShadow: "none"
          }}
        >
          <Table aria-label="simple table" sx={{ width: "max(800px ,100%)" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 0 }}>
                  <Common_table_button btnText={"Vacancy"} />
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <Common_table_button btnText={"INTERVIEWED CANDIDATES"} />
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <Common_table_button btnText={"ALL CANDIDATES"} />
                </TableCell>
                <TableCell sx={{ border: 0 }}>

                <Box className='table_header_col'>
                <Box component="div" sx={{
                    backgroundColor: "#EFF0F6",
                    padding: "5px",
                    textAlign: "center",
                    borderRadius: "10px",
                    color: "#4F5E74",
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    <Button variant="contained" sx={{ background: 'transparent', borderRadius: '7px', color: "#222", boxShadow: "none", padding: "0", "&:hover": { background: "transparent", boxShadow: "none" } }} >CLOSING DATE</Button>
                </Box>
                {/* upDownBtns => add custom css */}
                <Box className='upDownBtns'>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }} onClick={() => sortByYear("year")}><ArrowDropUpIcon /></Button>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }} onClick={() => sortByYear("year")}><ArrowDropDownIcon /></Button>
                </Box>
            </Box>

                  {/*    <Common_table_button btnText={"CLOSING DATE"} /> */}
                </TableCell>
                <TableCell sx={{ border: 0 ,paddingLeft: "4%" }}>
                  {/* ----option button create here ---- */}
                  <Box className='table_header_col' sx={{ gridTemplateColumns: "100% 0%" }}>
                    <Box component="div" sx={{
                      backgroundColor: "transparent",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "10px",
                      color: "#4F5E74",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                     {/* <Select
                        value={Option}
                        onChange={OptionSelect}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ padding: "0 10px 0 0", height: "10px" }}
                  >*/}
                         <MenuItem value="" sx={{ border: "none" }}>   
                          Options
                        </MenuItem>
                       {/* <MenuItem value={10}>Option1</MenuItem>
                        <MenuItem value={20}>Option2</MenuItem>
                        <MenuItem value={30}>Option3</MenuItem>
                </Select>*/}
                    </Box>
                  </Box>
                  {/* ----//option button create here ---- */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchInput ? (
                filteredProducts && filteredProducts.map((item, i) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:nth-of-type(odd), &:nth-of-type(even)": {
                        border: 0,
                        borderBottom: 0,
                      },
                    }}
                  >


                    <TableCell align="left" sx={{ cursor: "pointer", border: 0, paddingLeft: "4%" }} >
                      {capitalizeWords(item.title)}
                    </TableCell>
                    {/* <TableCell align="right">Last Date : {(new Date(item.updatedAt).getDate()) + "/" + (new Date(item.updatedAt).getMonth()) + "/" + (new Date(item.updatedAt).getFullYear())}</TableCell>*/}

                    <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }} >
                    {item.InterviewedCandidates}            
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }}>
                      {item.CandidateList}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                      {(new Date(item.linkExpDate).getDate()) + "/" + (new Date(item.linkExpDate).getMonth() + 1) + "/" + (new Date(item.linkExpDate).getFullYear())}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                      <LongMenu2 Vacancyy={item._id} VacancyyName={item.title} />
                    </TableCell>


                  </TableRow>
                )
                )
                // loop over filtered products, so only searched products are shown
              ) :!IsAskForSort? Vacancy && Vacancy.map((item, i) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:nth-of-type(odd), &:nth-of-type(even)": {
                      border: 0,
                      borderBottom: 0,
                    },
                  }}
                >
                  {console.log(item._id)}
                  <TableCell align="left" sx={{ cursor: "pointer", border: 0, paddingLeft: "4%" }} >
                    {capitalizeWords(item.title)}
                  </TableCell>
                  {/*  <TableCell align="right" sx={{ color: "gray" }}>Last edited : {(new Date(item.updatedAt).getDate()) + "/" + (new Date(item.updatedAt).getMonth()) + "/" + (new Date(item.updatedAt).getFullYear())}</TableCell>*/}
                  <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }} >
                  {item.InterviewedCandidates}            
                       </TableCell>
                  {console.log(item.CandidateList)}
                  <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }}>
                    {item.CandidateList}
                  </TableCell>
                  <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                    {(new Date(item.linkExpDate).getDate()) + "/" + (new Date(item.linkExpDate).getMonth() + 1) + "/" + (new Date(item.linkExpDate).getFullYear())}
                  </TableCell>
                  <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                    <LongMenu2 Vacancyy={item._id} VacancyyName={item.title} />
                  </TableCell>

                </TableRow>
              )
              ): VacancyResult && VacancyResult.map((item, i) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:nth-of-type(odd), &:nth-of-type(even)": {
                      border: 0,
                      borderBottom: 0,
                    },
                  }}
                >
                  {console.log(item._id)}
                  <TableCell align="left" sx={{ cursor: "pointer", border: 0, paddingLeft: "4%" }} >
                    {capitalizeWords(item.title)}
                  </TableCell>
                  {/*  <TableCell align="right" sx={{ color: "gray" }}>Last edited : {(new Date(item.updatedAt).getDate()) + "/" + (new Date(item.updatedAt).getMonth()) + "/" + (new Date(item.updatedAt).getFullYear())}</TableCell>*/}
                  <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }} >
                  {item.InterviewedCandidates}            
                       </TableCell>
                  {console.log(item.CandidateList)}
                  <TableCell align="left" sx={{ paddingLeft: "7%", border: 0 }}>
                    {item.CandidateList}
                  </TableCell>
                  <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                    {(new Date(item.linkExpDate).getDate()) + "/" + (new Date(item.linkExpDate).getMonth() + 1) + "/" + (new Date(item.linkExpDate).getFullYear())}
                  </TableCell>
                  <TableCell align="left" sx={{ paddingLeft: "6%", border: 0 }}>
                    <LongMenu2 Vacancyy={item._id} VacancyyName={item.title} />
                  </TableCell>

                </TableRow>))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </>
  );
}
