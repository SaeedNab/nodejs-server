const Controller = require("./../controller")
const User = require("../../models/User")
const bcrypt = require('bcrypt')
class UserController{
    customLogger(){

    }
    async updateProfile(req,res) {
        const messages = {}
        console.log(req.params.user)
        const user = await User.findById(req.params.user)
        if(req.body.firstName && req.body.firstName != null){
            user.firstName = req.body.firstName
            messages.userName = true           
        }
        if(req.body.lastName && req.body.lastName != null){
            user.lastName = req.body.lastName
            messages.lastName = true 
        }
        
        const updatedUser = await user.save()
        res.json({status:200, 
                message:"اطلاعات شما با موفقیت بروزرسانی شد",
                user:updatedUser
        },200)
        

    }
    async changePassword(req,res){
        const user = await User.findById(req.params.user)
        if(req.body.password && req.body.password != null){
            let result = bcrypt.compareSync(req.body.password, user.password); // true
            if(result){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                user.password = hash
                messages.password = true;
                res.json({ status:200,message:"پسورد با موفقیت تغییر کرد"},200)
            }else{
                messages.unvalidPassword =true
                res.json({ status:400,message:"پسورد نامعتبر است"},400)
            }
        }
    }
}


module.exports = new UserController();