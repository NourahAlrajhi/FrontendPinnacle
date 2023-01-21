
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
import Option_common_button from "../Open_jop_vacancies/Option_common_button";
import { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useRecruiterContext } from "../../Hook/UseRecruiterContext"
import { useAdminContext } from "../../Hook/useAdminContext"
import { usePositionsContext } from "../../Hook/usePositionsContext"
import { Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useVacancyContext } from "../../Hook/UseVacancy"
import { useEmployeeContext } from "../../Hook/UseEmployeeContext"

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

const RecruiterList = () => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const { Employee, dispatchhh } = useEmployeeContext()
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const { Admin } = useAdminContext()

  const [EmployeeResult, setEmployeeResult] = useState([{}]);
  const [EmployeDocID, setEmployeDocID] = useState('');






  useEffect(() => {
    console.log("formRows: ", EmployeeResult);

  }, [EmployeeResult]);

  useEffect(() => {
    console.log("formRows: ", Employee);
    const fetchPosition = async () => {
      //https://backend-pinnacle.herokuapp.com/
      const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Admin/ListEmployee', {
        headers: { 'Authorization': `Bearer ${Admin.tokenn}` },
      })
      const json = await response.json()
      if (response.ok) {
        dispatchhh({ type: 'SET_Employee', payload: json })
        console.log("===========")
        json && json.map((item, i) => {
          setEmployeeResult(item.Employee_Info)
          setEmployeDocID(item._id)
        })
        console.log("===========")


      }
    }
    if (Admin) {
      fetchPosition()
    }
  }, [dispatchhh, Admin])

  // ---select options--
  const [Option, setOption] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [ISAUTHRAIZE, setISAUTHRAIZE] = useState(false);


  function handleTests2(index) {
    let updateData = EmployeeResult.map((item, i) => {
      return index === i ? { ...item, IsAuth: !item.IsAuth } : item;
    });
    setEmployeeResult(updateData);
  }


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

    const filtered = EmployeeResult.filter(
      product =>
        product.Employee_Name
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




  const showAlertConfirmationForAuthorize = (Employee_Name, Employee_UserName, Employee_Password, Employee_ID,index) => {

    console.log('enterrrrrrrrrrr cancel')

    var msg = parse('<h3 style="text-align: center">Are you sure you want to give authorization to this Recruiter?</h3>')
    confirmAlert({
      message: msg,
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {GiveAuthorize(Employee_Name, Employee_UserName, Employee_Password, Employee_ID,index); handleTests2(index)},

        },
        {
          label: 'Cancel',
          onClick: () => setAnchorEl(null)
        }

      ]
    })

  }


  const showAlertConfirmationForUnAuthorize = (Employee_ID,index) => {
    console.log('enterrrrrrrrrrr cancel')

    var msg = parse('<h3 style="text-align: center">Are you sure you want to restrict access on this Recruiter?</h3>')
    confirmAlert({
      message: msg,
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {GiveUnAuthorize(Employee_ID,index);   handleTests2(index)},

        },
        {
          label: 'Cancel',
          onClick: () => setAnchorEl(null)
        }

      ]
    })

  }


  const GiveAuthorize = async (Employee_Name, Employee_UserName, Employee_Password, Employee_ID,index) => {
    console.log(Employee_Name)
    console.log(Employee_UserName)
    console.log(Employee_Password)
    console.log(Employee_ID)

    //https://backend-pinnacle.herokuapp.com/
    const AuthorizedEmployee = { logName: Employee_UserName, password: Employee_Password, name: Employee_Name, }
    const responseee = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/signup/' + Employee_ID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(AuthorizedEmployee)
    })

    const json = await responseee.json()
    if (responseee.ok) {
      showAlertSuccess()
      // navigate(`/RecruiterList`);
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
      console.log(json.IDCompany)
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")

      EmployeeResult && EmployeeResult.map(async (item, i) => {
        if (item.Employee_ID === Employee_ID) {
          //https://backend-pinnacle.herokuapp.com/
          const response2 = await fetch('https://backend-pinnacle.herokuapp.com/api/Admin/GIVEAUTH/' + EmployeDocID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Admin.tokenn}`
            },
            body: JSON.stringify({ Employee_ID })
          })
          const json2 = await response2.json()
          if (response2.ok) {
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH22222")
            console.log("Status Updated")
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH222222")
            //handleTests2(index);
          }

        }
      })

    }
    console.log("Enterrrrrr  GiveAuthorize")

  }


  const showAlertSuccess = () => {
    var msg = parse('<h3 style="text-align: center">Employee Authorized Successfully</h3>')
    confirmAlert({
      message: msg,
      buttons: []
    })
  }

  const showAlertSuccess22 = () => {
    var msg = parse('<h3 style="text-align: center">Employee UnAuthorized Successfully</h3>')
    confirmAlert({
      message: msg,
      buttons: []
    })
  }


  const GiveUnAuthorize = async (Employee_ID,index) => {
    console.log(Employee_ID)
    //https://backend-pinnacle.herokuapp.com/
   
    const responseee = await fetch('https://backend-pinnacle.herokuapp.com/api/Recruiter/RemoveRecruiter/' + Employee_ID, {
  
    })

    const json = await responseee.json()
    if (responseee.ok) {
      showAlertSuccess22()
      // navigate(`/RecruiterList`);
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
    //  console.log(json.IDCompany)
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")

      EmployeeResult && EmployeeResult.map(async (item, i) => {
        if (item.Employee_ID === Employee_ID) {
          //https://backend-pinnacle.herokuapp.com/
          const response2 = await fetch('https://backend-pinnacle.herokuapp.com/api/Admin/RemoveAUTH/' + EmployeDocID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Admin.tokenn}`
            },
            body: JSON.stringify({ Employee_ID })
          })
          const json2 = await response2.json()
          if (response2.ok) {
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH22222")
            console.log("Status Updated")
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH222222")
          //  setISAUTHRAIZE(true)
         // handleTests2(index);
          }

        }
      })

    }
    console.log("Enterrrrrr  GiveUnAuthorize")

  }

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
                Employees
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
                  <Common_table_button btnText={"Name"} />
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <Common_table_button btnText={"Employee ID"} />
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <Common_table_button btnText={"Status"} />
                </TableCell>
                {/*   <TableCell sx={{ border: 0 }}>
                  <Option_common_button />
                </TableCell>*/}
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
                    <TableCell align="left" sx={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "10%", border: 0 }}>
                    <PersonIcon />
                      {row.Employee_Name}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                      {row.Employee_ID}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                    {!row.IsAuth ?
                        <Button
                          className="download-table-xls-button"
                          style={{
                            background: "#14359F", border: "1px  rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            color: "white",
                            padding: "0.2rem 1.2rem ",
                            cursor: "pointer",

                          }}
                          onClick={() => {



                            showAlertConfirmationForAuthorize(row.Employee_Name, row.Employee_UserName, row.Employee_Password, row.Employee_ID);
                           // handleTests2(index)



                          }}
                        ><p style={{ fontWeight: 600 }}> Authorize</p></Button>
                        :
                        <Button
                          className="download-table-xls-button"
                          style={{
                            background: "#14359F", border: "1px  rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            color: "white",
                            padding: "0.2rem 1.2rem ",
                            cursor: "pointer",

                          }}
                          onClick={() => {


                            showAlertConfirmationForUnAuthorize(row.Employee_ID);
                          //  handleTests2(index)
                          }}

                        ><p style={{ fontWeight: 600 }}> UnAuthorize</p></Button>

                      }

                    </TableCell>
                    {/*  <TableCell align="left" sx={{ paddingLeft: "9%", border: 0 }}>
                      {row.protein}
                  </TableCell>*/}
                  </TableRow>
                )
                )
                // loop over filtered products, so only searched products are shown
              )
                : EmployeeResult && EmployeeResult.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:nth-of-type(odd), &:nth-of-type(even)": {
                        border: 0,
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell align="left" sx={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "10%", border: 0 }}>
                    <PersonIcon />
                      {row.Employee_Name}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "10%", border: 0 }}>
                      {row.Employee_ID}
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "8%", border: 0 }}>
                      {!row.IsAuth ?
                        <Button
                          className="download-table-xls-button"
                          style={{
                            background: "#14359F", border: "1px  rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            color: "white",
                            padding: "0.2rem 1.2rem ",
                            cursor: "pointer",

                          }}
                          onClick={() => {



                            showAlertConfirmationForAuthorize(row.Employee_Name, row.Employee_UserName, row.Employee_Password, row.Employee_ID,index);
                          //  handleTests2(index);



                          }}
                        ><p style={{ fontWeight: 600 }}> Authorize</p></Button>
                        :
                        <Button
                          className="download-table-xls-button"
                          style={{
                            background: "#14359F", border: "1px  rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            color: "white",
                            padding: "0.2rem 1.2rem ",
                            cursor: "pointer",

                          }}
                          onClick={() => {


                            showAlertConfirmationForUnAuthorize(row.Employee_ID,index);
                         //   handleTests2(index);

                          }}

                        ><p style={{ fontWeight: 600 }}> UnAuthorize</p></Button>

                      }

                    </TableCell>
                    {/* <TableCell align="left" sx={{ paddingLeft: "9%", border: 0 }}>
                    --
                    </TableCell>*/}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </>
  );
}

export default RecruiterList