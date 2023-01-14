import * as React from "react";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Option_common_button = () => {
    // ---select options--
    const [Option, setOption] = React.useState("");
    const OptionSelect = (event) => {
        setOption(event.target.value);
    };
    return (
        <>
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
                   {/*  <Select
                        value={Option}
                        onChange={OptionSelect}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ padding: "0 10px 0 0", height: "10px" }}
            >*/}
                        <MenuItem value="" sx={{ border: "none" }}>
                            Options
                        </MenuItem>
                       {/*  <MenuItem value={10}>Option1</MenuItem>
                        <MenuItem value={20}>Option2</MenuItem>
                        <MenuItem value={30}>Option3</MenuItem>
                    </Select>   >*/}
                </Box>
            </Box>
            {/* ----//option button create here ---- */}
        </>
    )
}

export default Option_common_button
