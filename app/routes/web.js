const express = require('express')
const router = express.Router();
const userController = require('./../http/controllers/admin/UserControler')
const orderController = require('./../http/controllers/admin/OrderController')
const categoryController = require('./../http/controllers/admin/CategoryController')
const productController = require('./../http/controllers/admin/ProductController')
const authController = require('./../http/controllers/admin/AuthController')
const multer = require('multer')
//مسیرهای مربوط به کاربران
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/resources/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + `.${file.mimetype.split('/')[1]}`) //Appending .jpg
    }
})

const upload = multer({ storage: storage });
//auth controllers
router.get('/login',authController.showLogin)
router.get('/logout',authController.logout)
router.post('/login',authController.login)

router.use((req,res,nex)=>{
    if(!req.session.admin){
        res.redirect('/admin/login')
    }
    nex()
})
router.get('/index',(req,res)=>{
    console.log(req.session.admin)
    res.render('dashboard.ejs')

})
router.get('/users',userController.users)
//مسیرهای مربوط به دسته ها
router.get('/categories',categoryController.categories)
router.get('/create_category',categoryController.createCategory)
router.get('/edit_category/:id',categoryController.editCategory)
router.post('/store_category',upload.single('image'),categoryController.storeCategory)
router.post('/update_category',upload.single('image'),categoryController.updateCategory)
router.delete('/delete_category/:id',categoryController.deleteCategory)
//مسیرهای مربوط به سفارشات
router.get('/orders',orderController.orders)
//مسیرهای مربوط به محصولات
router.get('/products',productController.products)
router.get('/create_product',productController.createProduct)
router.post('/store_product',upload.array('image',10),productController.storeProduct)
router.get('/edit_product/:id',productController.editProduct)
router.delete('/delete_product/:id',productController.deleteProduct)






module.exports = router;