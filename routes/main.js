const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');



router.get('/', controller.getItems)

router.get('/giveaway', (req,res)=>{
    res.render("giveaway");
})

router.post('/', (req, res)=>{
    let items = require("../Models/db.js");
    let index = parseInt(req.body.index)
    let myitems = [items[index]]
    res.render("main", {
        items: items,
        myitems: myitems
    });
})

module.exports = router;