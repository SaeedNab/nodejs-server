const Product = require('./../../models/Product');
const Category = require('./../../models/Category');
const fs = require('fs');
class ProductController{
    async products(req,res){
        const products = await Product.find()
        const success = await req.consumeFlash('success')
        const error = await req.consumeFlash('error')
        res.render('products.ejs',{
            products: products,
            error,
            success
        })

    }
    async editProduct(req,res){
        const categories = await Category.find({})
        console.log(req.params.id)
        res.render('create_product.ejs',
            {
                categories : categories
            }
            )

    }
    async createProduct(req,res){
        const categories = await Category.find({})

        res.render('create_product.ejs',{
            categories : categories

        })


    }
    async deleteProduct(req,res){
        const id = req.params.id
        try{
            const result = await Product.findByIdAndRemove({
                _id:id
            })
            if (result){
                console.log(result)
                result.img.forEach(img =>{
                    console.log(img)
                    fs.unlinkSync(img)
                })
                await req.flash('success','محصول با موفقیت حذف شد.')
                res.redirect('/admin/products')
            }else{
                await req.flash('error','خطایی در حذف محصول رخ داده است.')
                res.redirect('/admin/products')
            }
        }catch (e) {
            console.log(e)
            await req.flash('error','خطایی در حذف محصول رخ داده است.')
            res.redirect('/admin/products')
        }

    }

    async storeProduct(req,res){
        const name = req.body.productName
        const price = req.body.productPrice
        const description = req.body.description
        const instruction = req.body.instruction
        const specification = req.body.specification
        const category = req.body.category
        const product = new Product()
        product.name = name
        product.price = price
        product.description = description
        product.instruction = instruction
        product.specification = specification
        product.category.push(category)

        req.files.forEach(file =>{
            const image = `${file.destination}/${file.filename}`
            console.log(file)
            product.img.push(image)
        })
        try{
            const result = await product.save()
            if (result){
                await req.flash('success','محصول با موفقیت ثبت شد.')
                res.redirect('/admin/products')
            }else{
                await req.flash('error','خطایی در ثبت محصول رخ داده است.')
                res.redirect('/admin/products')
            }
        }catch(error){
            await req.flash('error','خطایی در ثبت محصول رخ داده است.')
            res.redirect('/admin/products')
        }


    }
}
module.exports = new ProductController