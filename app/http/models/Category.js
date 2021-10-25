const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"وارد کردن نام دسته ضروری است"]
    }, // String is shorthand for {type: String}
    img: {type:String,
        required:[
            true,
            'وارد کردن تصویر ضروری است'
        ]
    },
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Category', categorySchema);
