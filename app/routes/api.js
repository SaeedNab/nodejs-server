const express = require('express')
const router = express.Router();
const authController = require('./../http/controllers/user/AuthController')
const categoryController = require('./../http/controllers/user/CategoryController')
const productController = require('./../http/controllers/user/ProductController')
const paymentController = require('./../http/controllers/user/PaymentController')
const orderController = require('./../http/controllers/user/OrderController')
const addressController = require('./../http/controllers/user/AddressController')
const userController = require('./../http/controllers/user/UserController')

router.post('/register',authController.register)
router.post('/login',authController.login)
//categories routes
router.get('/categories',categoryController.categories)
router.get('/category/:id',categoryController.category)
// products routes
router.get('/products',productController.products)
router.get('/newProducts',productController.getNewProduct)
router.get('/product/:id',productController.product)
router.get('/productsByCategory/:id',productController.getProductsByCategory)
router.get('/productsByCategoryName/:name',productController.getProductsByCategoryName)
router.get('/bestSellingProducts',productController.getBestSellingProducts)
router.get('/search/:name',productController.searchByName)

// router.get('/searchProductByName/:name',productController.serachByName)
//payments routes
router.get('/payments/:id',paymentController.userPayments)
router.get('/payment/:id',paymentController.payment)
// orders routes
router.get("/orders/:id",orderController.userOrders)
router.get("/order/:id",orderController.order)
//address routes
// router.get("/addresses/:user",addressController.addresses)

router.post("/addAddress/:user",addressController.addAddress)
router.get("/addresses/:user",addressController.getAddresses)
router.post("/updateProfile/:user",userController.updateProfile)
router.post("/changePassword/:user",userController.changePassword)
module.exports = router