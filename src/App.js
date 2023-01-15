
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecruiterContext } from "./Hook/UseRecruiterContext"

// pages & components
import Home from './Pages/Home'
import Login from './Pages/Login'
import Navbar from './component/Navbar'
import PositionList from './Pages/PositionList'
import PositionDetails2 from './Pages/PositionDetails2'
import PositionForm from './Pages/PositionForm'
import Sidebar from './component/SideBar'
import EditPosition from './Pages/EditPosition'
import CreateJobbVacancy from './Pages/CreateJobVacancy'
import { Layout } from './component/Layout'


import { useLocation } from 'react-router-dom';

import Open_jop_vacancies_main from './Pages/Open_jop_vacancies/Open_jop_vacancies_main'
import Closed_jop_vacancies_main from './Pages/Closed_job_vacancies/Closed_jop_vacancies_main';
import View_job_vacancy_main from './Pages/View_job_vacancy/View_job_vacancy_main';
import Candidates_results_main from './Pages/View_job_vacancy/Candidates_results/Candidates_results_main';
import Interview_result from './Pages/View_job_vacancy/Candidates_results/Interview_result.jsx/Interview_result';
import Active_vacancy from './Pages/View_job_vacancy/Active_vacancy';
import Interview_welcome_screen from './Pages/InterviewScreen/Interview_welcome_screen';
import Question_interview from './Pages/InterviewScreen/Question_interview';

function App() {

  const { Recruiter } = useRecruiterContext()
  const NAVBAR_TEXTS = [{ page: "/Interview_welcome_screen/:VacancyID/:CandidateDocID/:CandidateID", text: true }, { page: "/Question_interview/:VacancyID/:CandidateDocID/:CandidateID", text: true }]
  //const location = useLocation();

  //const textToShow = NAVBAR_TEXTS.find(el => el.page === location.pathname)?.text
  return (

    <BrowserRouter>




      {!Recruiter ?

        <Routes>

          {/* --login screen-- */}
          <Route exact path="/" element={<Login />} />
          {/* --interview screen-- */}
          <Route exact path="/Interview_welcome_screen/:VacancyID/:CandidateDocID/:CandidateID" element={<Interview_welcome_screen />} />
          <Route exact path="/Question_interview/:VacancyID/:CandidateDocID/:CandidateID" element={<Question_interview />} />

        </Routes>

        :



        <Routes>

          <Route element={<Layout />}>
            <Route
            extact path="/home"
              element={Recruiter ? <Home /> : <Navigate to="/" />}
            />
            <Route
              extact path="/"
              element={!Recruiter ? <Login /> : <Navigate to="/home" />} />
            <Route
              path="/PositionList"
              element={Recruiter ? <PositionList /> : <Navigate to="/" />}
            />
            <Route
              path="/PositionDetails2/:id"
              element={Recruiter ? <PositionDetails2 /> : <Navigate to="/" />}
            />
            <Route
              path="/PositionForm"
              element={Recruiter ? <PositionForm /> : <Navigate to="/" />}
            />
            <Route
              path="/EditPosition/:id"
              element={Recruiter ? <EditPosition /> : <Navigate to="/" />}
            />
            <Route
              path="/CreateJobbVacancy"
              element={Recruiter ? <CreateJobbVacancy /> : <Navigate to="/" />}
            />



            <Route path="/Dashboard/View_job_vacancy_main" element={Recruiter ? <View_job_vacancy_main /> : <Navigate to="/" />}>
              <Route path="/Dashboard/View_job_vacancy_main" element={Recruiter ? <Active_vacancy /> : <Navigate to="/" />} />
              <Route path="/Dashboard/View_job_vacancy_main/Closed_jop_vacancies_main" element={Recruiter ? <Closed_jop_vacancies_main /> : <Navigate to="/" />} />
              <Route path="/Dashboard/View_job_vacancy_main/Candidates_results_main/:id/:Name" element={Recruiter ? <Candidates_results_main /> : <Navigate to="/" />} />
              <Route path="/Dashboard/View_job_vacancy_main/Candidates_results_main/Interview_result/:id3/:id2/:id4" element={Recruiter ? <Interview_result /> : <Navigate to="/" />} />
              <Route exact path="/Dashboard/View_job_vacancy_main/Open_jop_vacancies_main" element={Recruiter ? <Open_jop_vacancies_main /> : <Navigate to="/" />} />
            </Route>

          </Route>



        </Routes>



      }
    </BrowserRouter>



  );
}

export default App;