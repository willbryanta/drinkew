function passUserToView( req, res, next ){

    res.locals.user = req.session.user ? req.session.user : null;
    next();

} // passUserToView

module.exports = passUserToView;