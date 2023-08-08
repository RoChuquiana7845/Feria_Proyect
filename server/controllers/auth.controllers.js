import passport from "passport";

const authenticateUser = passport.authenticate('local', {
    successFlash: "/administration",
    failureRedirect: "/log-in",
    failureFlash: true,
    badRequestMessage: 'Both fields are required'
}); 

const userAuthenticated = (req, res, next) => { 
    if (req.isAuthenticated()) { 
        return next();
    }
    return res.redirect('/log-in');
}

const logOut = (req, res, next) => { 
    req.logout();
    req.flash('success', "You  successfully logged out");
    req.redirect('/log-in');
    next();
}

export { 
    authenticateUser,
    userAuthenticated,
    logOut
}