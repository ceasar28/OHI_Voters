
const passport = require("passport");
const User = require('../models/User');   // requiring the User schema
const uuid = require('../helpers/randomUID')

const{
    loginUser,
    searchUsername,
    getReferrees,
    getUsers,
    getUsersCount,
    deleteUser,
} = require('../services/userServices')


class UserController {

    // login
   // login 
async loginUser(req, res){
    const user = await User({
    username: req.body.username,
    password: req.body.password,
  })
  console.log(user);

  await passport.authenticate("local", (err, user)=>{
    try{
        if (!user){
            const status = "unauthorised"
            res.send({message:status})
            console.log(status)
            return;
        }
        req.login(user,(error)=>{
            if(!error){
                const status = "authorised"
                res.send({message:status}) 
                return;  
               
            }
            
        })
    } catch(error){
        console.log(error)
    }

  })(req, res);
}

    // async loginUser(req, res){
    //     const user = await loginUser(req.body)
    //     console.log(user)
    //     await passport.authenticate('local', (err, user)=>{
    //     try{
    //         if (!user){
    //             const status = "unauthorised"
    //             res.send({message:status})
    //             console.log(status)
    //             return;
    //         }else{
    //             req.login(user,(error)=>{
    //             if(!error){
    //                 const status = "authorised"
    //                 res.send({message:status}) 
    //                 return;  
    //             }})}
    //     }catch(error){
    //     console.log(error)
    //     }
    //     })(req, res);
    // }


        // logout
    async logoutUser(req, res){
        await req.logout((err)=> {
        try{
            if (err) {
             return next(err);
            }        
            res.redirect('/')
        } catch(error){
        console.log(error)
        }
        })
    }


    // register User
    async registerUser(req, res){
        const newUser = await new User({
            lastName : req.body.lName,
            firstName : req.body.fName,
            middleName : req.body.mNames,
            fullName : `${req.body.lName} ${req.body.fName} ${req.body.mNames}`,
            PhoneNo : req.body.phone,
            email : req.body.email,
            username : req.body.email,
            DOB : req.body.dob,
            gender : req.body.gender,
            maritalStatus : req.body.mStatus,
            VIN : req.body.vin,
            OHI_id : uuid(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            StateOfReg : req.body.state,
            maidenName : req.body.maidenName,
            registeredBeforeMarriage : req.body.regBefore,
            passportImg: req.file.filename,
            referralEmail : req.body.referralEmail,
        })

  
        await User.register(newUser,req.body.password, async (error, user)=>{ // the value `user` is set to false, the user could not be authenticated since the user is not active
            try{
                if(error){
                const status = "unsuccessful"
                res.send({message:status})
                return;
                }else{
                const status = "successful"
                res.send({message:status})
                return;
                }
            }catch(err){
                console.log(error)
            }

        })
    }

    // change email
//     async changeEmail(req,res){
//         const {email} = req.body;
//     const newEmail = await User.updateMany({_id:req.user._id},{$set :{ 
//     email:email,
//     username:email,
// }})

//       try{
//         if(newEmail){
//             const message = "successful"
//             res.send({message:message})
//         }
//     }catch(error){
//         console.log(error)
//     }

//  } 


 // change password
async changePassword( req, res){
    const oldPassword= req.body.oldPassword
    const newPassword= req.body.newPassword
    if(req.isAuthenticated()){
        const foundUser = await User.findOne({username:req.user.username})
        try{
            if (foundUser){
                    foundUser.changePassword(oldPassword, newPassword)
                    .then(()=>{
                        const message = "successful"
                        res.send({message:message})
                    })
                    .catch((error)=>{
                        console.log(error)
                        const message = "unsuccessful"
                        res.send({message:message})
                    })             
            }
        } catch (error){
            console.log(error)
        }
    }

}

//  to change email

async changeEmail(req, res){
    const email = req.body.email
        if(req.isAuthenticated()){
      try{
           const update = await User.findOneAndUpdate({_id:req.user._id},{$set :{
        email:email,
        username:email,
        }})

      
            if (update){
                        const message = "successful"
                        res.send({message:message})
                    }
                        const message = "unsuccessful"
                        res.send({message:message})
            }catch (error){
            console.log(error)}
    }

}

// Update profile
async updateVoters(req, res){
    
    const lName=req.body.lName
    const fName=req.body.fName
    const mName=req.body.mName
    const Phone=req.body.Phone
    const email=req.body.email
    const DOB=req.body.DOB
    const gender=req.body.gender
    const mStatus=req.body.mStatus
    const StateOfReg=req.body.stateOfReg
    const maidenName=req.body.maidenName
    const regBefore=req.body.regBefore
    const vin=req.body.vin
    console.log(req.body)


  try{
     await User.findOneAndUpdate({_id:req.user._id},{$set :{
     lastName:lName,
     firstName:fName,
     middleName:mName,
     PhoneNo:Phone,
     email:email,
     username:email,
     DOB:DOB,
     gender:gender,
     maritalStatus:mStatus,
     stateOfReg:StateOfReg,
     maidenName:maidenName,
     registeredBeforeMarriage:regBefore,
     VIN : vin,
}},{new : true}, (err,updated)=>{
    if(!err){
        const message ="successful"
        res.send({message:message})
        console.log(updated);
        return;
    }
        const message = "unsuccessful"
        res.send({message:message})
        return;
}).clone();     
  }catch(error){
        console.log(error)
        return;
    }

}

// upload profile picture
async uploadLogo(req, res){
    const image = req.file.filename
    console.log(image)
    const uploadLogo = await User.findOneAndUpdate({_id:req.user._id},{passportImg:image})
    try{
        if(uploadLogo){
            const message = "successful"
            res.send({message:message})
            return;
        } else if(!uploadLogo){
            const message = "unsuccessful"
        res.send({message:message})
        return;
        }
    } catch(error){
        console.log(error)
    }
}


    //to check for existing username
    async searchUsername(req, res){
        const result = await searchUsername(req.body);
        console.log(result)
        res.send({username:result})
        return;
    }



    // get refferees
    // async getReferrees(req, res){
    //     const result = await getReferrees(req.user)
    //     res.send({count:result})
    //     return ;
    // }


    // get all users
    async getAllUser(req, res){
        const allUser = await getUsers();
        res.send(allUser)
        return;
    }

    // get all users count
    async getUsersCount(req, res){
        const count = await getUsersCount();
        res.send({count:count})
        return;
    }

    


}

module.exports = new UserController ()