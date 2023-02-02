import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@material-ui/core";
import Common_table_button from "../Table_components/Common_table_button";
import Common_table_dropdown from "../Table_components/Common_table_dropdown";
import Active_vacancy_table_search_bar from "../Table_components/table_search_bar";
import Option_common_button from "./Option_common_button";
import { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import { usePositionsContext } from "../../Hook/usePositionsContext"
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useVacancyContext } from "../../Hook/UseVacancy"
import ForMoreMenueOpenJobVacancy from "../../component/ForMoreMenueOpenJobVacancy"

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Backend Developer", "--", "--", "--", "--"),
  createData("Cloud Architect ", "--", "--", "--", "--"),
  createData("Technical Specialist", "--", "--", "--", "--"),
  createData("Application Developer", "--", "--", "--", "--"),
  createData("Junior Dev  ", "--", "--", "--", "--"),
  createData("Backend Developer", "--", "--", "--", "--"),
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




export default function Open_job_table() {





  const { Vacancy, dispatchhh } = useVacancyContext()
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const [RecruiterVacancy, setRecruiterVacancy] = useState(Recruiter.Vavancy);
  const [VacancyResult, setVacancyResult] = useState([{}]);

useEffect(() => {
  console.log("formRows: ", Vacancy);
  const fetchPosition = async () => {
    const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/ListOpen', {
      headers: { 'Authorization': `Bearer ${Recruiter.token}` },
    })
    const json = await response.json()
    if (response.ok) {
      dispatchhh({ type: 'SET_Vacancy', payload: json })
      console.log("===========")
      console.log(RecruiterVacancy)
      console.log("===========")
      console.log(RecruiterVacancy.length)

    }
  }
  if (Recruiter) {
    fetchPosition()
  }
}, [dispatchhh, Recruiter])

  // ---select options--
  const [Option, setOption] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);


  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  // your search event handler
  function search(searchTerm) {
    // update search value
    setSearchInput(searchTerm);

    const filtered = Vacancy.filter(
      product =>
        product.name
          .toString()
          .toLowerCase()
          .includes(searchInput.toString().toLowerCase()),
    );

    // set filtered products in state
    setFilteredProducts(filtered);
  }


  const OptionSelect = (event) => {
    setOption(event.target.value);
  };

  return (
    <>
      {/* table_main_container => add custom css */}
      <Box className="table_main_container">
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
            Open Jop Vacancies 
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
                <TableCell sx={{ border: 0,paddingLeft: "6%" }}>
                  <Option_common_button />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>


              {searchInput ? (
                filteredProducts && filteredProducts.map((row, index) => (
                  <TableRow
                  key={row._id}
                    sx={{
                      "&:nth-of-type(odd), &:nth-of-type(even)": {
                        border: 0,
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell align="left" sx={{ paddingLeft: "4%", border: 0 }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                      {row.fat}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "9%", border: 0 }}>
                    <ForMoreMenueOpenJobVacancy Vacancyy={row._id} VacancyyName={row.title} />
                    </TableCell>
                  </TableRow>
                )
                )
                // loop over filtered products, so only searched products are shown
              )
              : Vacancy && Vacancy.map((row, index) => (
                  <TableRow
                  key={row._id}
                    sx={{
                      "&:nth-of-type(odd), &:nth-of-type(even)": {
                        border: 0,
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell align="left" sx={{ paddingLeft: "4%", border: 0 }}>
                    {capitalizeWords(row.title)}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                    --
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                    --
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "9%", border: 0 }}>
                    <ForMoreMenueOpenJobVacancy Vacancyy={row._id} VacancyyName={row.title} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </>
  );
}
