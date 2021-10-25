const Order = require('../../models/Order')
class OrderController {
    async orders(req, res) {
        const orders = await Order.find({})
        res.render('orders.ejs',{
            orders:orders
        })
    }
}


module.exports = new OrderController