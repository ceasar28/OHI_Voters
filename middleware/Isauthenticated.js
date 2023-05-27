// to ensure a user is authenticated

const isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect ('/');
        return;
    }

}

module.exports = isAuthenticated