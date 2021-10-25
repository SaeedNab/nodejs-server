const Category = require('./../../models/Category')

class AuthController {
   async categories(req,res){
       const categories =await Category.find({})
       res.json({
           status:200,
           categories:categories
       }).status(200)
   }
    async category(req,res){
       const id = req.params.id
        const category =await Category.findOne({
            _id:id
        })
        res.json({
            status:200,
            category:category
        }).status(200)
    }

}


module.exports = new AuthController