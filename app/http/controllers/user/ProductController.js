const Product = require('./../../models/Product')
const Category = require('./../../models/Category')

class ProductController {
   async products(req,res){
    //    const newProducts = await Product.find({}).limit(12)
    //    const bestSellingProducts = await Product.find({}).sort('-sell_count').limit(12)
        const products = await Product.find({})
        // const best = products.sort((a,b)=>a.sell_count>b.sell_count)
        // const new = products.sort((a,b)=>a.)
       const categories = await Category.find({}).limit(4)
       res.json({
           status:200,
           products,

       }).status(200)
   }
    async product(req,res){
       const id =req.params.id
        const product = await Product.find({
            _id:id
        })
        res.json({
            status:200,
            product:product
        }).status(200)
    }
    async getNewProduct(req,res){
        const product = await Product.find({}).limit(12)
        res.json({
            status:200,
            products:product
        }).status(200)
    }
    async getBestSellingProducts(req,res){
        const product = await Product.find({
        }).sort('+sell_count').limit(12)
        res.json({
            status:200,
            products:product
        }).status(200)
    }
    async getProductsByCategory(req,res){
        const id =req.params.id
        const products = await Product.find({
            category : {"$in":[id]}
        })
        res.json({
            status:200,
            products:products
        }).status(200)
    }
    async getProductsByCategoryName(req,res){
        const name =req.params.name
        const product = await Product.find({
            category : {"$in":[name]}
        })
        res.json({
            status:200,
            product:product
        }).status(200)
    }
    async searchByName(req,res){
        const name = req.params.name
        console.log(name)
        const products = await Product.find({
            name : {$regex:'.*' + name + '.*'}
        })
        res.json({
            status:200,
            products:products
        }).status(200)
    }


}


module.exports = new ProductController