                                          
                                                // to change email
                                                const emailchange = document.getElementById('emailchange')

                                                emailchange.addEventListener('submit', async function (evt) {
                                                    evt.preventDefault()
                                                    const email = document.getElementById('email').value;

                                                    await fetch('auth/change-email', {
                                                        method: 'POST',
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({
                                                            email: email,
                                                        })
                                                    })
                                                        .then(res => res.json())
                                                        .then(data => {
                                                            let updated = data.message;

                                                            if (updated == "successful") {
                                                                swal({
                                                                    icon: "success",
                                                                    text: "Email successfully Updated",
                                                                    button: false,
                                                                })
                                                                setTimeout(() => { location.assign("/login-details"); }, 1000);
                                                            }
                                                        })
                                                })
                                         