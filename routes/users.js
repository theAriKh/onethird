const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

const controllerA = require('../controllers/admin');


router.get('/login', controller.login)

//Routes the adding of items for both user and admin
router.get('/index', controllerA.isAdmin)
router.get('admin/add', controllerA.addItem)
router.post('admin/add', controllerA.processItem)

//routes receipt information to my orders
router.get('/myOrders', controller.getReceipts)

//facilitate login and registration
router.post('/login', controller.getUser)
router.get('/register',controller.register)

// create new user
router.post('/register', controller.createUser)
router.get('/myaccount', controller.getMyAccount)
router.get('/logout', controller.logout)
router.delete('/checkout', controller.checkout)


router.put('/myaccount/info', controller.updateInfo)
router.put('/myaccount/homeaddress', controller.updateAddress)



module.exports = router;