const passport = require('passport')
const User = require('../auth/user')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//801824372608-k56ql8varcnfn3jlpktv38kfqq65seno.apps.googleusercontent.com
//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

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    return done(err)
                }
                if(result){
                    return done(null, user)
                }
            })
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '801824372608-k56ql8varcnfn3jlpktv38kfqq65seno.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({googleId: profile.id})
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
      return cb(null, newUser);
  }
));

passport.serializeUser(function(user,done){
    console.log(`${user} :serialized`)
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).then((user, error) => {
        done(error, user)
    })
})