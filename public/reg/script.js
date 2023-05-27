  // to search if a username already exist
     async function searchUsername(b) {
          await  fetch('username', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: b.value })
            })
            .then(res => res.json())
            .then(data => {
                let userExist = data.username;

                if (userExist == "") {
                    document.getElementById("userExist").innerHTML = "";
                    if(document.getElementById('invalidEmail').innerHTML==""){
                        document.getElementById("regButton").disabled = false;
                    }else{document.getElementById("regButton").disabled = true}                  
                } else {
                    document.getElementById("userExist").textContent = userExist;
                    if(document.getElementById('invalidEmail').innerHTML==""){
                    document.getElementById("regButton").disabled = true
                    }  
                }
            });
        }

 
 
 
 
 ////////////////////////// post Register form data  //////////////////////////
const regForm = document.getElementById('regForm')


regForm.addEventListener('submit', async function(e){
    e.preventDefault();  // prevent the default property of a form to reload after submitting

    const formData = new FormData(this);

    await fetch('auth/register',{
    method:'POST',
    body:formData,
})
.then(res=>res.json())
.then(data =>{
    const message = data.message
    if( message == "successful"){
        swal({
             icon: "success",
             text: "Signup succesful",
             button: false,
            })
        setTimeout(() => {location.assign("/index") ; }, 1000);
    }else if (message == "unsuccessful"){
        swal({
             icon: "error",
             text: "There was an error during signup please try again",
             button: false,
            })
    }

    })

})



