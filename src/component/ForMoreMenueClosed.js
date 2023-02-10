import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { usePositionsContext } from "../Hook/usePositionsContext"
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useVacancyContext } from "../Hook/UseVacancy"

const options = [
    'View',
    'Delete',
]

const ITEM_HEIGHT = 48;

export default function LongMenu3({ Vacancyy, VacancyyName }) {
    const { Recruiter } = useRecruiterContext()
    const { Positions, dispatch } = usePositionsContext()
    const { Vacancy, dispatchhh } = useVacancyContext()

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        if (e === "View") {
            console.log(Vacancyy)
            navigate(`/Dashboard/View_job_vacancy_main/Candidates_results_main/${Vacancyy}/${VacancyyName}`)

        } else if (e == "Delete") {

            var msg = parse('<h3 style="text-align: center">Are you sure you want to Delete this Job Vacancy?</h3>')
            confirmAlert({
                // message: msg,
                // buttons: [
                //     {
                //         label: 'Yes',
                //         onClick: () => handleClick22(Vacancyy)
                //     },
                //     {
                //         label: 'No',
                //         onClick: () => navigate("/Dashboard/View_job_vacancy_main")
                //     }

                // ]

                // ----change ui---
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui' style={{ width: "min(600px , 95%)", background: "white", boxShadow: "0px 0px 8px lightgray", borderRadius: "8px", padding: "5%" }}>
                            <h3>Confirmation Message</h3>
                            <p style={{ padding: "1.5rem 0", textAlign: "center", fontWeight: "600", color: "gray" }}>Are You Sure You Want To Delete This Job Vacancy?</p>

                            <div style={{ padding: "1rem 0 0 0", display: "flex", justifyContent: "end", gap: "10px" }}>
                                <button onClick={() => {
                                    navigate("/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main")
                                    onClose()
                                }} style={{ padding: "5px 10px", background: "transparent", border: "none", fontSize: "1.2rem" }}>No</button>
                                <button onClick={() => {
                                    handleClick22(Vacancyy)
                                    onClose()
                                }} style={{ padding: "5px 10px", color: "#14359F", background: "transparent", border: "none", fontSize: "1.2rem" }}>Yes</button>
                            </div>
                        </div>
                    )
                }
                // ----//change ui---


            })



        }
        else {
            setAnchorEl(null);
        }
    };



    const handleClick22 = async (DeletdId) => {
        if (!Recruiter) {
            return
        }
        const response = await fetch('https://backend-pinnacle.herokuapp.com/api/Candidate/' + DeletdId, {
            method: 'DELETE',

            headers: { 'Authorization': `Bearer ${Recruiter.token}` },

        })
        const json = await response.json()
        if (response.ok) {
            dispatchhh({ type: 'DELETE_Vacancy', payload: json })
            navigate('/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main');
        }
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon sx={{ color: "gray" }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
