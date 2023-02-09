import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';

function Dashboard_footer(props) {
    console.log(props.width)
    return (
        <>
            <Box sx={{ flexGrow: 1, position: 'absolute', bottom: '0%', right: "0%", width: `calc(100% - 250px)`, backgroundColor: 'white', borderTop: '1px solid lightgray', padding: '5px', zIndex: "20" }}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
                        <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "#14359F" }}>
                            <Typography>Info</Typography>
                            <Typography> Support</Typography>
                            <Typography> Contact</Typography>
                        </Typography>
                        <Typography sx={{ color: "gray" }}>
                            ©2023 Pinnacle
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Dashboard_footer;