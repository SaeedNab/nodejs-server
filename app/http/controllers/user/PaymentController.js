const Payment = require('./../../models/Payment')

class PaymentController {
   async userPayments(req,res){
       const id = req.params.id
       const payments = await Payment.find({
           user:id
       })
       res.json({
           status:200,
           payments:payments
       }).status(200)
   }
    async payment(req,res){
        const id = req.params.id
        const payment = await Payment.find({
            _id:id
        })
        res.json({
            status:200,
            payment:payment
        }).status(200)
    }

}


module.exports = new PaymentController