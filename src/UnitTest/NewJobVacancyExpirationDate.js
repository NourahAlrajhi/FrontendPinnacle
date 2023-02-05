// const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
//   const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)


  export const NewJobVacancyExpirationDate =  (Date , date) => {
    // const date = new Date();
     if(Date<date){
       return null
     }else{
       return true
     }
   };