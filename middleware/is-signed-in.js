function isSignedIn( req, res, next ){

    if( req.session.user ){
        next();// Proceed to the next route handler
    } else {
        res.redirect('/auth/sign-in'); // Login!

    }// IsSignedIn()
}

module.exports = isSignedIn;