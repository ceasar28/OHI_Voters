

// update logo
const logoForm = document.getElementById('logoForm')

logoForm.addEventListener('submit', async function(b){
    b.preventDefault()
    
    const formData = new FormData(this);

      await fetch ('user-image',{
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data =>{
        let updated = data.message;

        if(updated == "successful"){
            swal({
             icon: "success",
             text: "passport successfully Updated",
             button: false,
            })
        setTimeout(() => {location.assign("/voters-details") ; }, 900);
        } else if (updated == "unsucessful"){
             swal({
                            icon: "error",
                            text: "there was an error",
                            button: false,
                        })
            setTimeout(() => {location.assign("/voters-details") ; }, 900);
        }
    })
    
})


