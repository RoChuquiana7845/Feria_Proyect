import passport from "passport";
import LocalStrategy from 'passport-local';
import User from "../models/User.model.js";

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async ( email, password, next) => { 
    const user =  await User.findOne({'email':  {$eq: email}, active: {$eq: 1}});
    if(!user){
        return next(null, false, {
            message: 'This user does not exist'
        });
    };
    if (user.password  != password) { 
        return next(null, false, {
            message: 'Wrong Password'
        })
    }
    return next(null, user);
}))

passport.serializeUser(function(user, cb) { 
    cb(null, user);
});

passport.deserializeUser(function(user, cb) { 
    cb(null, user);
})

export default passport;
