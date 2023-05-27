const express = require ('express');
const router = express.Router();
const isAuthenticated = require ('../../middleware/Isauthenticated'); // to ensure a user is authenticated before accessing a route
const User = require('../../models/User');


const {
    getUsersCount,
    getVerifiedUsersCount,
    getUnVerifiedUsersCount,
    getUsers,
    getVerifiedUsers,
    getUnVerifiedUsers,
    verifyUser,
    unverifyUser,
    getUser,
} = require('../../services/userServices')

//@description: admin index  page
//@route: GET '/admin/index
router.get('/index',isAuthenticated,async(req, res)=>{
    try{
    const usersCount = await getUsersCount()
    const verifiedUsersCount = await getVerifiedUsersCount()
    const unVerifiedUsersCount = await getUnVerifiedUsersCount()
    res.render('A_index',{
        admin:req.user,
        usersCount,
        verifiedUsersCount,
        unVerifiedUsersCount,
    })
    }catch(error){
        console.log(error)
    }

})

//@description: admin get all users  page
//@route: GET '/admin/index
router.get('/all-users',isAuthenticated,async (req, res)=>{
    try{
    const allUsers = await getUsers();
    res.render('all-users',{
        admin:req.user,
        allUsers,
    }) 
    }catch(error){
        console.log(error)
    }

})

//@description: admin get unverified user  page
//@route: GET '/admin/unverified-users
router.get('/unverified-users',isAuthenticated,async (req, res)=>{
    try{
        const Unverifieds = await getUnVerifiedUsers()
        res.render('unverified-users',{
        admin:req.user,
        Unverifieds,
        })
    }catch(error){
        console.log(error)
    }

})

//@description: admin get verified user  page
//@route: GET '/admin/index
router.get('/verified-users',isAuthenticated, async(req, res)=>{
    try{
        const verifieds = await getVerifiedUsers()
        res.render('verified-users',{
        admin:req.user,
        verifieds,
    })
    }catch(error){
        console.log(error)
    }

})
//@description: verify user
//@route: POST '/admin/verify-user'
router.post('/verify-user/:id',isAuthenticated, async(req, res)=>{
    const isUserVerified = req.body.status
    console.log(req.params)
    console.log(req.body)
    try{
        const verify = await verifyUser(req.params.id)
    }catch(error){
console.log(error)
    }
})

//@description: Unverify user
//@route: POST '/admin/unverify-user'
router.post('/unverify-user/:id',isAuthenticated, async(req, res)=>{
    const isUserVerified = req.body.status
    console.log(req.params)
    console.log(req.body)
    try{
        const verify = await unverifyUser(req.params.id)
           
    }catch(error){
console.log(error)
    }
})

module.exports= router