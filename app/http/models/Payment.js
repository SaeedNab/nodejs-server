const mongoose = require('mongoose');
const Schema = mongoose.Schema

const paymentSchema = new mongoose.Schema({
    user: {type:Schema.Types.ObjectId,
        ref:'User',
        unique:true,
        required:[
            true,
            'وارد کردن کاربر ضروری است'
        ]
    }, // String is shorthand for {type: String}
    ref: {type:String,
        required:[
            true,
            'وارد کردن شماره پیگیری ضروری است'
        ]
    },
     // String is shorthand for {type: String}
    price: {type:String,
    required:[
    true,
    'وارد کردن مبلغ ضروری است'
]
},
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Payment',paymentSchema);
