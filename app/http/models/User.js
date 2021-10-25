const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String,
        unique:true,
        required:[
            true,
            'وارد کردن نام کاربری ضروری است'
        ]
    }, // String is shorthand for {type: String}
    address: [
        {
            firstName:{
                type:String,
                required:[
                    true,
                    'وارد کردن نام الزامی است'
                ],
                min:[
                    2,
                    'نام حداقل باید دو حرفی باشد'
                ],

            },
            lastName:{
                type:String,
                required:[
                    true,
                    'وارد کردن نام خانوادگی الزامی است'
                ],
                min:[
                    2,
                    'نام خانوادگی حداقل باید دو حرفی باشد'
                ],
                
            },
            address:{
                type:String,
                required:[
                    true,
                    'وارد کردن آدرس الزامی است'
                ],
                min:[
                    2,
                    'نام حداقل باید ده حرفی باشد'
                ],
                
            }
    }
    ],
    firstName:{
        type:String,
        required:false,
        min:[
            2,
            'نام حداقل باید ده حرفی باشد'
        ],
        

    },
    lastName:{
        type:String,
        required:false,
        min:[
            2,
            'نام خانوادگی حداقل باید ده حرفی باشد'
        ],
        
    },

    password: {type:String,
        required:[
            true,
            'وارد کردن کلمه عبور ضروری است'
        ]
    },
    email: {type:String,
        unique:true,
        required:[
            true,
            'وارد کردن ایمیل ضروری است',

        ]
    },
    date: { type: Date, default: Date.now },

});
module.exports = mongoose.model('User',userSchema);
