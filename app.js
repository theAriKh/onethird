const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')

// Connect to mongoose
mongoose.connect('mongodb://localhost/onethird')
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => {
        console.log(err)
    });

//Load routes
const home = require('./routes/home');
const users = require('./routes/users');
const main = require('./routes/main');


app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Use routes
app.use('/', home);
app.use('/users', users);
app.use('/main', main);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})