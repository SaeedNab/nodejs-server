const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors())
const UserController = require('./app/http/controllers/user/UserController')
const path = require("path");
app.use(express.static(path.join(__dirname, 'app/resources')))
const bodyParser = require('body-parser')
const fs = require('fs')
const methodOverride = require('method-override')
const {flash} = require('express-flash-message')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
const web = require('./app/routes/web')
const api = require('./app/routes/api')
const config = require('config')
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))


// parse application/json
app.use(cookieParser('keyboard cat'));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
        },
    })
);
app.use(flash({ sessionKeyName: 'flashMessage' }));
// app.use(cookieParser());
// app.use(session({cookie: {maxAge: 60000},secret:"suppfitness"}));
// app.use(flash());
app.use(bodyParser.json())
app.use(express.static('app/resources'))
app.set('views', path.join('app/resources/views'))
app.use('/admin', web)
app.use('/user', api)
mongoose.connect(`mongodb://localhost:27017/${config.get('database.name')}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('connected successfull')
}).catch(err => {
    console.log(`${err}`)
});


app.listen(3001, (error) => {
    UserController.customLogger()
})