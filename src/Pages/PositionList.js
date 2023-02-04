// components
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { usePositionsContext } from "../Hook/usePositionsContext"
import { useRecruiterContext } from "../Hook/UseRecruiterContext"
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import parse from 'html-react-parser';
import { DataGrid } from '@mui/x-data-grid';
import  StickyHeadTable  from '../component/List';

const PositionList = () => {
  /*const [searchInput, setSearchInput] = useState("");
  const { Positions, dispatch } = usePositionsContext()
  const { Recruiter } = useRecruiterContext()
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);



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


  const showAlertSuccess = (idddd) => {
    var msg = parse('<span>Are you sure you want to Delet this position?!!</span>')
    confirmAlert({
      message: msg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleClick(idddd)
        },
        {
          label: 'No',
          onClick: () => navigate("/PositionList")
        }

      ]
    })
  }

  const handleClick = async (DeletdId) => {
    if (!Recruiter) {
      return
    }
    const response = await fetch('/api/Position/' + DeletdId, {
      method: 'DELETE',

      headers: { 'Authorization': `Bearer ${Recruiter.token}` },

    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_Position', payload: json })
      navigate('/PositionList');
    }


  }*/
  const navigate = useNavigate();
  return (
    <section>
   
   <button onClick={()=>navigate("/EditPosition/639e427afe569ac184e62fe9")}   id="PositionList">Go To Edit Position </button>

     <StickyHeadTable/>

    </section>
  )
}

export default PositionList




