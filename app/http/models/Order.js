const mongoose = require('mongoose');
const Schema = mongoose.Schema
const orderSchema = new mongoose.Schema({
    _id:Schema.Types.ObjectId,
    user: {type:Schema.Types.ObjectId,ref:'User'}, // String is shorthand for {type: String}
    products: [{type:Schema.Types.ObjectId,ref:'Product'}],
    price:{
        type:String,
        required:[true,'قیمتی وارد نشده است']
    },
    address: {type:String,
            required:[true,"آدرس وارد نشده است"]
    },
    payment: {type:Schema.Types.ObjectId,ref:'Payment'},
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Order', orderSchema);
