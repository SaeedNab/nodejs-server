const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = new mongoose.Schema({
    name: {type:String,
        required:[
            true,
            'وارد کردن نام محصول ضروری است'
        ]
    }, // String is shorthand for {type: String}
    img: [{type:String, required:[true, "وارد کردن تصویر ضروری است"]}],
    price: {type:String,
        required:[
            true,
            'وارد کردن قیمت محصول ضروری است'
        ]
    },
    description:{
        type:String,
        required:[
            true,
            'وارد کردن توضیحات ضروری است.'
        ]
    },
    specification:{
        type:String,
        required:[
            true,
            'وارد کردن مشخصات ضروری است.'
        ]
    },
    instruction:{
        type:String,
        required:[
            true,
            'وارد کردن دستورالعمل ضروری است.'
        ]
    },
    category:[{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }],
    sell_count:{
      type:Number,
      default:0,
    },
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Product', productSchema);
