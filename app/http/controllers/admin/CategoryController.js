const Category = require('./../../models/Category')
const fs = require('fs')
class CategoryController {
    async categories(req,res){
        const categories = await Category.find({})
        const success = await req.consumeFlash('success')
        const error = await req.consumeFlash('error')
        console.log(success)
        res.render('categories.ejs',{
            categories,
            success: success,
            error:error
        })

    }
    async updateCategory(req,res){
        const name = req.body.categoryName
        const image = `${req.file.destination}/${req.file.filename}`
        const category = new Category()
        category.name = name
        category.img = image
        try{
            await category.save()
        }catch(error){
            console.log(error)
        }
        await req.flash('success','عملیات ثبت دسته با موفقیت انجام شد.')
        res.redirect('/admin/categories')
    }
    createCategory(req,res){
        res.render('create_category.ejs')

    }
    async editCategory(req,res){
        const category = await Category.find({
            _id:req.params.id
        })

        res.render('edit_category.ejs',{
            category
        })

    }
    async storeCategory(req,res,next){
        const name = req.body.categoryName
        const image = `${req.file.destination}/${req.file.filename}`
        const category = new Category()
        category.name = name
        category.img = image
        try{
            await category.save()
        }catch(error){
            console.log(error)
        }
        await req.flash('success','عملیات ثبت دسته با موفقیت انجام شد.')
        res.redirect('/admin/categories')
    }
    async deleteCategory(req,res){
        const id = req.params.id
        try{
            const result = await Category.findByIdAndRemove({
                _id:id
            })
            if(result){
                fs.unlinkSync(result.img)
                await req.flash('success','دسته با موفقیت حذف شد.')
                res.redirect('/admin/categories')
            }else{

                await req.flash('error','خطایی در حذف کردن دسته رخ داده است.')
                res.redirect('/admin/categories')
            }
        }catch (e) {
            await req.flash('error','خطایی در حذف کردن دسته رخ داده است.')
            res.redirect('/admin/categories')        }
        // await req.flash('error','خطایی در حذف دسته رخ داده است.')
        // res.redirect('/admin/categories')



    }
}
module.exports =new CategoryController;