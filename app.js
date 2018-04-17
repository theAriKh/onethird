const express = require ('express');
const app = express();
const path = require('path')


//Load routes
const home = require('./routes/home');
const users = require('./routes/users');


app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Use routes
app.use('/', home);
app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})