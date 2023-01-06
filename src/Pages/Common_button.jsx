import { Button } from "@mui/material";
import React from "react";
function Common_button(props){
    return(<>
  <Button variant="contained" sx={{padding:"0.5rem 2rem" ,background: "#14359F", borderRadius: "8px" , "&:hover" : {background:"white" ,  color:"#14359F"}}} endIcon={props.btnIcon}>{props.btnText}</Button>
    </>)
}
export default Common_button