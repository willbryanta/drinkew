const dotenv = require('dotenv');
dotenv.config({ path: '.env'});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Load models
const Drink = require('./models/drink');
const User = require('./models/user');

app.set('view engine', 'ejs');

const authController = require('./controllers/auth')

app.use( morgan('dev'))
app.use( express.static('public'))
app.use( express.urlencoded({ extended: true }))
app.use( methodOverride('_method', { methods: ['POST', 'GET']}));

app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}));

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected!`)
})

app.use('/auth', authController)

// Home
app.get('/', (req, res) => {
    res.render('home')
})


app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
});