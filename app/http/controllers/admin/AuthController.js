const User = require('./../../models/User')
const bcrypt = require('bcrypt')
const Admin = require('./../../models/Admin')
class AuthController {
    async login(req, res) {
        const username = req.body.username
        const password = req.body.password
        const admin = await Admin.findOne({
            username:username
        })
        console.log(admin)
        if (admin){
            const hash = admin.password
            if(bcrypt.compareSync(password, hash)){
                req.session.admin = admin
                res.redirect('/admin/index')
            }
            else{
                await req.flash('error','کلمه عبور اشتباه است')
                res.redirect('/admin/login')
            }

        }else{
            await req.flash('error','نام کاربری اشتباه است')
            res.redirect('/admin/login')
        }


    }
    async showLogin(req,res){
        if (req.session.admin){
            res.redirect('/admin/index')
        }
        const error = await req.consumeFlash('error')
        res.render('login.ejs',{
            error
        })
    }
    logout(req,res){
        req.session.admin = false
        res.redirect('/admin/login')
    }

}


module.exports = new AuthController