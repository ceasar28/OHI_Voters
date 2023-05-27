// to validate the email and password
const username = document.getElementById('email')
const password = document.getElementById('password')

function validateEmail(a){
    const validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validemail = username.value.match(validMailFormat);
    if (!validemail){
        document.getElementById("invalidEmail").innerHTML = "Invalid email or empty email field"; 
    }else{
        document.getElementById("invalidEmail").innerHTML = "";
    }
} 

 function validatepassword(c){
    if(password.value.length < 6){
        document.getElementById("invalidpass").innerHTML = "Password should be more than 6 characters";
    }else{
        document.getElementById("invalidpass").innerHTML = "";
    }
}