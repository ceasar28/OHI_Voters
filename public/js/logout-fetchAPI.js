

const logoutlink = document.getElementById('logoutLink')

logoutlink.addEventListener('click',async function(e){
    e.preventDefault();
 
    swal({

        title: "Logout",
        text:"You are about to log out now",
        buttons:["No", "Yes"],
    })
.then((isConfirm)=>{
    if(isConfirm){
       swal("You have successfully logged out", {
      icon: "success",
      button: false,
      });
    setTimeout(() => { location.assign("/auth/logout"); }, 700);
    }; return false;
})
})
