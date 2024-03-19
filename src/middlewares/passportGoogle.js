const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const utils = require('../utils')
const repo = require("../repository")

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:8080/user/google/callback',
    passReqToCallback:true,
    proxy:true
}, async (req,accessToken,refreshToken,profile,cb)=>{
        const password = await utils.bcrypt.hashed(Math.random().toString(36).slice(2))

        const defaultUser = {
            username:`${profile.emails[0].value.split('@')[0]}`,
            displayName:`${profile.name.givenName}${profile.name.familyName}`,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.emails[0].value,
            profileImageUrl:profile.photos[0].value,
            password
        }

        console.log("default",defaultUser)
        const user = await repo.user.get({
            OR: [
                { username:defaultUser.username }, 
                { email:defaultUser.email }
            ]})
        console.log("user",user)
        console.log("session",req.session)
        if(user) return cb(null,user)
        if(!user) {
            const newUser = await repo.user.create(defaultUser)
            console.log(newUser)
            return cb(null,newUser)
        }
}))

passport.serializeUser((user,cb)=>{
    console.log("Serializing user",user)
    cb(null,user.id)
})

// passport.deserializeUser(async(id,cb)=>{
//     console.log("Deserializing user",id)
//     const user = await repo.user.get({id}).catch((err)=>{
//         console.log("Error deserializing",err)
//         cb(err,null)
//     })
//     console.log("from deserialize",user)
//     if(user) cb(null,user)
// })

passport.deserializeUser(async (id, cb) => {
    console.log("Deserializing user", id);
    try {
        const user = await repo.user.get({ id });
        console.log("User found:", user);
        if (user) {
            cb(null, user);
        } else {
            cb(new Error("User not found"), null);
        }
    } catch (err) {
        console.error("Error deserializing user:", err);
        cb(err, null);
    }
});