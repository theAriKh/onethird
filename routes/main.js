const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    // console.log("here", items);
    let items = require("../Models/db.js");
    let myitems =[]
    res.render("main", {
        items: items,
        myitems:myitems
    });
})

router.get('/giveaway', (req,res)=>{
    res.render("giveaway");
})

router.post('/', (req, res)=>{
    let items = require("../Models/db.js");
    let index = parseInt(req.body.index)
    let myitems = [items[index]]
    console.log("item: ", items[index])
    res.render("main", {
        items: items,
        myitems: myitems
    });
})

module.exports = router;