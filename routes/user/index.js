const express = require ('express');
const router = express.Router();
const isAuthenticated = require ('../../middleware/Isauthenticated') // to ensure a user is authenticated before accessing a route

const upload = require ('../../middleware/fileUpload');
const{
    searchUsername,
    uploadLogo,
    updateVoters,
    getAllUser,
    getUsersCount,
} = require('../../controllers/userControllers');

const{
    getReferrees,
}= require('../../services/userServices')



//@description: login/landing page
//@route: GET '/'
router.get('/',(req, res)=>{
    res.render('login')
})

//@description: register page
//@route: GET '/register
router.get('/register',(req, res)=>{
    res.render('register')
})

//@description: index  page
//@route: GET '/index
router.get('/index',isAuthenticated, async (req, res)=>{
    try{
    const refferalsCount = await getReferrees(req.user);
    res.render('index',{
       user:req.user,
       refferalsCount,
    })
    }catch(error){
        console.log(error)
    }

})

//@description: login-details
//@route: GET '/login-details
router.get('/login-details',isAuthenticated,(req, res)=>{
    const user = req.user
    res.render('login-details',{
        user: req.user,
    })
})

//@description: voters-details
//@route: GET 'voters-details'
router.get('/voters-details',isAuthenticated,(req, res)=>{

    res.render('voters-details',{
        user:req.user,

    })
})

//@description: change password
//@route: GET '/change-paaword
router.get('/change-password',isAuthenticated,(req, res)=>{
    const user = req.user
    res.render('changePassword',{
        user: req.user,
    })
})


//@description: check a username
//@route: Post 'username'
router.post('/username',searchUsername)



//@description: change passport image
//@route: Post 'user-image'
router.post('/user-image',upload.single('passportImage'),uploadLogo)

//@description: update details
//@route: Post '/voters-details'
router.post('/voters-details',updateVoters)

//@description: allUser count
//@route: get 'allUsers'
// router.get('/admin/allUsers-count',getUsersCount)




module.exports= router