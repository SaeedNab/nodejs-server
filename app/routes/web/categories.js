const express = require('express')
const router = express.Router()

router.get('categories',(req,res)=>{
    res.render('categories.ejs')
})
router.get('create_product',(req,res)=>{
    res.render('create_category.ejs')
})
router.get('edit_product',(req,res)=>{
    res.render('edit_category.ejs')
})




module.exports = router