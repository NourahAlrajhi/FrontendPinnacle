import React from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Common_table_button = (props) => {
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
                    <Button variant="contained" sx={{ background: 'transparent', borderRadius: '7px', color: "#222", boxShadow: "none", padding: "0", "&:hover": { background: "transparent", boxShadow: "none" } }}>{props.btnText}</Button>
                </Box>
                {/* upDownBtns => add custom css */}
                {/* <Box className='upDownBtns'>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }}><ArrowDropUpIcon /></Button>
                    <Button variant="contained" sx={{ background: "transparent", color: "#222", boxShadow: "none", height: "5px", width: "5px", minWidth: "auto", "&:hover": { background: "transparent", color: "#222", boxShadow: "none" } }}><ArrowDropDownIcon /></Button>
                </Box>*/}
            </Box>
        </>
    )
}

export default Common_table_button;