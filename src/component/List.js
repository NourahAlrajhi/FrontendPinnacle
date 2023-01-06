import * as React from "react";
import Button from "@mui/material/Button";
// -------table component----------------
import Table from "@mui/material/Table";
import Active_vacancy_table_search_bar from "../Pages/Table_components/table_search_bar";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import { shadows } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
// icon--
import AddIcon from '@mui/icons-material/Add';
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePositionsContext } from "../Hook/usePositionsContext"
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import LongMenu from '../component/ForMoreMenu'
///////////////////////////////////////////////////////////////////////////////////////////////
import Typography from '@mui/material/Typography';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

/*interface Column {
    id: 'Positions' | 'Last Edited' | 'More';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170, align?: 'center'; },
    { id: 'Last Edited', label: 'Last Edited', minWidth: 100, align?: 'center'; },
    {
        id: 'More',
        label: 'More',
        minWidth: 170,
        align?: 'center';
    }
];

interface Data {
    name: string;
  Last Edited: string;
More: component;
  
}

function createData(
    name: string;
    Last Edited: string;
    More: component;
): Data {
    return { name, Last Edited, More };
}*/


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
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  useEffect(() => {
    console.log("formRows: ", Positions);
    const fetchPosition = async () => {
      const response = await fetch('/api/Position', {
        headers: { 'Authorization': `Bearer ${Recruiter.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_Position', payload: json })
      }
    }
    if (Recruiter) {
      fetchPosition()
    }
  }, [dispatch, Recruiter])

  // your search event handler
  function search(searchTerm) {
    // update search value
    setSearchInput(searchTerm);

    const filtered = Positions.filter(
      product =>
        product.name
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

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: { xs: "90px", md: "90px" } }}>
        <Grid item xs={12} sx={{ textAlign: "end", marginTop: { xs: "10px", md: "auto" } }}>
          {/* ---upper bar button--- */}
          <Link to="/PositionForm">
            <Button variant='contained' sx={{ backgroundColor: "#14359F" }} startIcon={<AddIcon />}>New Position</Button></Link>
        </Grid>
        <Grid item xs={12}>

          <TableContainer

            sx={{
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
              padding: "-2px",
              marginTop: { xs: "5px", md: "20px" },
              maxHeight: { xs: "auto", md: "74vh" },
              width: "100%",
              overflow: "auto",
            }}
            className="table_Positions"
          >
            <Table sx={{ width: "max(400px ,100%)", }} size="full" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell width="70%">
                  <Typography  style={{ fontSize:"22px"}} fontWeight={700}>
                  Positions 
                        </Typography>
       
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <Box sx={{ position: "sticky", top: "-10px", background: "white", zIndex: "6" }}>
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
          </AppBar>   
                              </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ padding: "20px" }}>
                {searchInput ? (
                  filteredProducts && filteredProducts.map((item, i) => (
                    <TableRow
                      key={item.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {capitalizeWords(item.name)}
                      </TableCell>
                      <TableCell align="right">Last Date : {(new Date(item.updatedAt).getDate()) + "/" + (new Date(item.updatedAt).getMonth()+ 1) + "/" + (new Date(item.updatedAt).getFullYear())}</TableCell>
                      <TableCell align="right">
                        {/* ---popover button---- */}
                        <LongMenu Position={item._id} />



                        {/* ---popover button---- */}
                      </TableCell>
                    </TableRow>
                  )
                  )
                  // loop over filtered products, so only searched products are shown
                ) : Positions && Positions.map((item, i) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {capitalizeWords(item.name)}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "gray" }}>Last edited : {(new Date(item.updatedAt).getDate()) + "/" + (new Date(item.updatedAt).getMonth()+1) + "/" + (new Date(item.updatedAt).getFullYear())}</TableCell>
                    <TableCell align="right">
                      {/* ---popover button---- */}
                      <LongMenu Position={item._id} />


                      {/* ---popover button---- */}
                    </TableCell>
                  </TableRow>
                )
                )
                }


              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
