// const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
//   const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)


  export const NewJobVacancySheet =  (str) => {
    // e.preventDefault();
    // setEmailError("");
    
   if (str!=="Candidates.xlsx") {
      return "Only .XLSX and .CSV files are allowed";

    } else   {
      return ".XLSX files Uploaded Successfully";

    }


  };