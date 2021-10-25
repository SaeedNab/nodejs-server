const User = require('./../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

class AuthController {
    async register(req, res) {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const repeat_password = req.body.repeat_password
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required().messages({
                    "string.base": "نام کاربری باید رشته باشد",
                    "string.min": "نام کاربری باید بیشتر از سه حرف باشد",
                    "string.max": "نام کاربری باید کمتر از سی حرف باشد",
                    "any.required": "نام کاربری ضروری است",
                }),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
                    "string.base": "نام کاربری باید رشته باشد",
                    "any.required": "وارد کردن کلمه عبور ضروری است",
                }),

            repeat_password: Joi.ref('password'),

            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required().messages({
                    "string.base": "نام کاربری باید رشته باشد",
                    "string.email": "ایمیل نامعتبر است",
                    "any.required": "وارد کردن ایمیل ضروری است",

                }),
        })
        const {error, value} = schema.validate({
            username,
            password,
            repeat_password,
            email
        });
        if (!error) {
            try {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const user = new User()
                user.username = username
                user.password = hash
                user.email = email
                const result = await user.save()
                if (result) {
                    res.json({
                        status: 201,
                        user: result
                    },201)
                    // res.json({
                    //     status: 201,
                    //     user: result
                    // }).status(201)
                } else {
                    res.json({
                        status: 400,
                        message: "خطایی رخ داده است"
                    },400)
                }
            } catch (error) {
                res.json({
                    status: 500,
                    message: "خطایی رخ داده است"
                },500)
            }
        } else {
            res.json({
                status: 400,
                message: error.message
            },400)
        }

    }

    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required().messages({
                    "string.base": "نام کاربری باید رشته باشد",
                    "string.min": "نام کاربری باید بیشتر از سه حرف باشد",
                    "string.max": "نام کاربری باید کمتر از سی حرف باشد",
                    "any.required": "نام کاربری ضروری است",
                }),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
                    "string.base": "نام کاربری باید رشته باشد",
                    "any.required": "وارد کردن کلمه عبور ضروری است",
                }),

        })
        const {error, value} = schema.validate({
            username,
            password,

        });
        if (!error) {
            const user = await User.findOne({
                username
            })
            if (user) {
                const hash = user.password
                if (bcrypt.compareSync(password, hash)) {
                    const token = jwt.sign({
                        id:user._id,
                        username:user.username,
                        email:user.email,
                    }, 'shhhhh')

                    res.json({
                        status: 202,
                        message: "عملیات با موفقیت انجام شد",
                        token
                    },202)
                } else {
                    res.json({
                        status: 400,
                        message: "کلمه عبور اشتباه است",
                    },400)
                }
            } else {
                res.json({
                    status: 404,
                    message: "چنین کاربری یافت نشد",
                },404)
            }
        } else {
            res.json({
                status: 400,
                message: error.message,
            },400);
        }

    }

}


module.exports = new AuthController