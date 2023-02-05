const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const isLetters = (str) => /^[ A-Za-z?.,]*$/.test(str)
  const isLetters2 = (str) => /^[ A-Za-z0-9+.,]*$/.test(str)


  export const EditPosition =  (str,str2,str3,str4,str5,str6) => {
    // e.preventDefault();
    // setEmailError("");
    
    if (str === "" || str2==="" || str3===0 || str4==="" || str5==="" || str6==="") {
      return false;
  
    } else if (!isLetters(str)) {
      return  false;

    } else if (!isLetters2(str2)) {
      return false;

    }else if (str3>273000) {
      return false;
    } else if (!isLetters(str5)) {
      return false;

    } else if (!isLetters2(str6)) {
      return false;

    }  else {
      return true;
    }
  };