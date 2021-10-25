const Order = require('./../../models/Order')

class OrderController {
   async userOrders(req,res){
       const id = req.params.id
       const orders = await Order.find({
           user:id
       })
       res.json({
           status:200,
           orders:orders
       }).status(200)
   }
    async order(req,res){
        const id = req.params.id
        const order = await Order.find({
            _id:id
        })
        res.json({
            status:200,
            order:order
        }).status(200)
    }

}


module.exports = new OrderController