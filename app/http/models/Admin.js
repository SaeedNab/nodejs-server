const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,'وارد کردن نام کاربری ضروری است'],
    }, // String is shorthand for {type: String}
    password: {type:String,
        required:[true,'وارد کردن کلمه عبور ضروری است']
    },
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('Admin', adminSchema);
