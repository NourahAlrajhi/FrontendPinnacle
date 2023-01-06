import React from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const Common_table_dropdown = (props) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            {/* table_header_col => add custom css */}
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
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ padding: "0 10px 0 0", height: "10px" }}
                    >
                        <MenuItem value="" sx={{ border: "none" }}>
                            {props.btnText}
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Box>
                {/* upDownBtns => add custom css */}
                <Box className='upDownBtns'>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }}><ArrowDropUpIcon /></Button>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }}><ArrowDropDownIcon /></Button>
                </Box>
            </Box>
        </>
    )
}

export default Common_table_dropdown;