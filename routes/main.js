const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    // console.log("here", items);
    let items = [];
    res.render("main", {
        items: items
    });
})

router.get('/giveaway', (req,res)=>{
    res.render("giveaway");
})

module.exports = router;