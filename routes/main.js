const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("main")
})

router.get('/giveaway', (req,res)=>{
    res.render("giveaway")
})

module.exports = router;