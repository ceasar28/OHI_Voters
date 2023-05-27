// post login form using fetch API
const loginForm = document.getElementById('signUp')

loginForm.addEventListener('submit', async function (evt) {
    evt.preventDefault(); // to prevent the custom form property of reloading on submission.
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    await fetch('auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then(res => res.json())
        .then(data => {
            const message = data.message
            if (message == "authorised") {
                swal({
                    icon: "success",
                    text: "Succefully logged in",
                    button: false,
                })
                setTimeout(() => { location.assign('/index'); }, 1000);
            } else if (message == "unauthorised") {
                swal({
                    icon: "error",
                    text: "Username or Password incorrect",
                    button: false,
                })
            }
        })

})

