// to integrate the API call of members rest API

const getUsersCount = async ()=>{
    
    await fetch("allUsers-count", {
        method : "GET",
    })
    .then(res => res.json())
    .then( data =>{
        const number = data.count

        document.getElementById("allUser").innerHTML = number;
    })
}

getUsersCount();