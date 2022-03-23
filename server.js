if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport'); 
const methodOverride = require('method-override');
const connectDB = require('./Mongo/connect');



const initializePassport = require('./Middleware/passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
const users = []

app.set('view engine', 'ejs');

app.use("/Styles",express.static(__dirname + "/views/Styles"));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized:false
}));
app.use(passport.initialize())
app.use(passport.session())
require('./Middleware/passport-config')(passport);
app.use(methodOverride('_method'))

app.get('/',(req, res)=>{
    res.render('index.ejs')
})

app.get('/home',(req, res)=>{
    res.render('home.ejs')
})

app.get('/about',(req, res)=>{
    res.render('about.ejs')
})
app.get('/contact',(req, res)=>{
    res.render('contact.ejs')
})
app.get('/Dash', ensureAuthenticated,(req, res) => {
    res.render('dashboard.ejs',{name:req.user.name})
})

app.get('/Login', notAuthenticated,(req, res) => {
    res.render('login.ejs')
})

app.get('/Register',notAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/Login', passport.authenticate('local', {
    successRedirect: '/Dash',
    failureRedirect: '/Login',
    failureFlash: true
  }))

app.post('/Register',notAuthenticated,async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        users.push({ 
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        res.redirect('/Login')
    }catch{
        res.redirect('/Register')
    }
    console.log(users)
})

app.delete('/logout',(req, res) => {
    req.logout()
    res.redirect('/Login')
})

function ensureAuthenticated(req, res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/Login')
}

function notAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

const port = process.env.PORT ||3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await populateProducts()
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();