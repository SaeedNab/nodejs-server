const express = require('express')
const router = express.Router()

router.get('/products',(req,res)=>{
    res.render('products.ejs')
})
router.get('create_product',(req,res)=>{
    res.render('create_product.ejs')
})
router.get('edit_product',(req,res)=>{
    res.render('edit_product.ejs')
})




module.exports = router