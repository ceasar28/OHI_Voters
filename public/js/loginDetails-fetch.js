// email change
const logoForm = document.getElementById('logoForm')

logoForm.addEventListener('submit', async function(b){
    b.preventDefault()
    
    const formData = new FormData(this);

      await fetch ('profile/logo',{
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data =>{
        let updated = data.message;

        if(updated == "successful"){
            swal({
             icon: "success",
             text: "logo successfully Updated",
             button: false,
            })
        setTimeout(() => {location.assign("/profile") ; }, 900);
        } else if (updated == "unsucessful"){
             swal({
                            icon: "error",
                            text: "Username or Password incorrect",
                            button: false,
                        })
            setTimeout(() => {location.assign("/profile") ; }, 900);
        }
    })
    
})