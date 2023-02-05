

// const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
//   const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)
  export const Login =  (str ,str2) => {
    // e.preventDefault();
    // setEmailError("");
    
    if (str === "" && str2 ==="") {
      return false;

    } else if (str==="Nourah2001" && str2 !== "Nourah@999") {
      return false;

    } else if (str!=="Nourah2001" && str2 === "Nourah@999") {
      return false;
    
    }else {
      return true;
     
    }
  };

 
 



