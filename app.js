const express = require ('express');
const app = express();

//Load routes
const home = require('./routes/home');

app.set('view engine', 'ejs');

// User toutes
app.use('/', home);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})