       


        // change password
        const changePassword = document.getElementById('changePassword')

        changePassword.addEventListener('submit', async function (e) {
            e.preventDefault();  // prevent the default property of a form to reload after submitting
             const oldPassword = document.getElementById('oldPassword').value
            const newPassword = document.getElementById('password')


            await fetch('auth/change-password', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword.value,
                     }),
            })
                    .then(res => res.json())
                    .then(data => {
                        const message = data.message
                        if (message == "successful") {
                            swal({
                                icon: "success",
                                text: "Password change successful",
                                button: false,
                            })
                            setTimeout(() => { location.assign("/login-details"); }, 950);
                        } else if (message == "unsuccessful") {
                            swal({
                                icon: "error",
                                text: "There was an please try again",
                                button: false,
                            })
                        }

                    })

            })
 




