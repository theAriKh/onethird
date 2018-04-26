const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// Connect to mongoose
// mongoose.connect('mongodb://localhost/onethird')
//     .then(() => console.log('MongoDB Connected..'))
//     .catch(err => {
//         console.log(err)
//     });

//Load routes
const home = require('./routes/home');
const users = require('./routes/users');
const main = require('./routes/main');


app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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