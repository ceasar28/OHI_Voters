const User = require('../models/User');   // requiring the User schema
// const _ = require('lodash');



class UserServices {


        async loginUser(data){
        const user = await User ({
            username : data.username,
            password : data.password,
        })
        return user;
    }

  async searchUsername(data){
        const userName = data.username
        console.log(userName);
        const existingUsername = await User.findOne({username:userName})
        try{
            if(existingUsername){
                const message = " Username is already taken"
                return message
            }else {
                const message = ""
                return message
            }
        }catch(error){
            console.log(error)
        }
    }
   

    async getReferrees(data){

       const {email} =data
        const referrees = await User.find({referralEmail:email}).count()

        return referrees ;
    }

    async getUsers(){
        const users = await User.find({}).lean()
        return users;
    }

    async getUsersCount(){
        const count = await User.find({}).count()
        return count;
    }

    async getVerifiedUsers(){
        const users =await User.find({validated:'Verified'})
        return users;
    }
    async getVerifiedUsersCount(){
        const count =await User.find({validated:'Verified'}).count()
        return count;
    }


     async getUnVerifiedUsers(){
        const users =await User.find({validated:'Unverified'})
        return users;
    }

    async getUnVerifiedUsersCount(){
        const count =await User.find({validated:'Unverified'}).count()
        return count;
    }

    async getUser(_id){
        const user = await User.findOne({_id})

        return user;
    }

    async getUsersCount(){
        const users = (await User.find({})).length

        return users
    }

    async verifyUser(params){

      await User.findOneAndUpdate({_id:params},{$set:{validated:'Verified'}},{new : true}, async (err, updated)=>{
            if(updated){
                const message ="successful"
                return message;
            }
            const message = "unsuccessful"
            return message;
        }).clone();
    }

    async unverifyUser(params){
       const status = await User.findOneAndUpdate({_id:params},{$set:{validated:'Unverified'}},{new : true}, async (err,updated)=>{
            if(!err){
                const message = "successful"
                return message;
            }
            const message = "unsuccessful"
            return message;
        }).clone();
        return status
    }


    async deleteUser(_id){
        const user = await User.findOneAndDelete({_id})

        return user
    }



}


module.exports = new UserServices();