const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const radioRoutes = require('./routes/radioRoutes');
// const css = require('./public/style.css')
const cookieParser = require('cookie-parser');
const {  checkUser } = require('./middleware/authMiddleware');
// const {  apiFetch } = require('./middleware/apiGetter');

require('dotenv').config()
const app = express();

// const helmet = require("helmet");


// app.css_post = ( '/css',(req, res) => {

//   var cssString = css.Tostring()
// res = cssString
   
//     res.render('css');
//   })


// middleware
const cors = require("cors");

var corsOptions = {
};


app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// app.use(helmet());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.APIKEY;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(radioRoutes);