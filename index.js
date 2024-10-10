const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const signupRouter = require('./src/routes/signup');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));



app.get('/', (req, res) => {
    res.render('homepage/index');
});

app.use('/signup', signupRouter);

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});