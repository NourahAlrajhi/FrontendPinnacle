////This page must be in the trashhhhhhhhhhhhhhhhhhhhh


import { usePositionsContext } from "../Hook/usePositionsContext"
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { Link, useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { YourComponent } from "./Menu"
import parse from 'html-react-parser';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PositionDetails = ({ Position }) => {
    const navigate = useNavigate();
    var d =new Date(Position.updatedAt)
    const { dispatch } = usePositionsContext()
    const { Recruiter } = useRecruiterContext()

    console.log(Position.name)

    const showAlertSuccess = () => {
        var msg = parse('<span>Are you sure you want to Delet this position?!!</span>')
        confirmAlert({
            message: msg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleClick()
                },
                {
                    label: 'No',
                    onClick: () => navigate("/PositionList")
                }

            ]
        })
    }

    const handleClick = async () => {
        if (!Recruiter) {
            return
        }
        const response = await fetch('/api/Position/' + Position._id, {
            method: 'DELETE',

            headers: { 'Authorization': `Bearer ${Recruiter.token}` },

        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_Position', payload: json })
            navigate('/PositionList');
        }


    }

    return (

        <div className="workout-details">

            <Link to={`/PositionDetails2/${Position._id}`}>

                <h4>{Position.name}</h4>
                <p><strong>Last edited : </strong>{d.getDate()+ "/"+ d.getMonth()+"/"+d.getFullYear()}</p>
            </Link>
            <div>
                <YourComponent Position={Position} key={Position._id} />
            </div>
            <span className="material-symbols-outlined" onClick={showAlertSuccess}>delete</span>
        </div>
    )
}

export default PositionDetails