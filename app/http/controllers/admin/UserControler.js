const User = require('./../../models/User')
class UserController {
    async users(req, res) {
        const users = await User.find({})
        res.render('users.ejs',{
            users : users
        })
    }

}


module.exports = new UserController