// import { Box } from "@material-ui/core";
import React from "react";
import Applicants_vacancy_graph from "./Applicants_vacancy_graph";
import Grid from "@mui/material/Unstable_Grid2";
// import { styled } from "@mui/material/styles";
import Active_vacancy_table from "./Active_vacancy_table";
import Calandar_event_graph from "./Calandar_event_graph";

function Active_vacancy() {
  return (
    <>
      <Grid container spacing={2} sx={{ overflow: "hidden", margin: "1rem auto", }}>
        <Grid xs={12} lg={6}>
          {/* ---calandar event graph-- */}
          <Calandar_event_graph />
          {/* ---//calandar event graph-- */}
        </Grid>
        <Grid
          xs={12}
          lg={6}
        >
          <Applicants_vacancy_graph />
        </Grid>
        <Grid xs={12} >
          <Active_vacancy_table />
        </Grid>
      </Grid>
    </>
  );
}

export default Active_vacancy;
