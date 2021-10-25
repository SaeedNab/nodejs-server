const User = require('../../models/User')

class AddressController {
   async addresses(req,res){
        const user = await User.findById(req.params.user)
       const addresses = user.address
       res.json({
           status:200,
           addresses
       }).status(200)
   
    }
    async addAddress(req,res){
        const user = await User.findById(req.params.user)
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const address = req.body.address
        console.log(firstName + " " + lastName + " " + address)
        user.address.push({
           firstName:firstName,
           lastName:lastName,
           address:address
       })
       await user.save()
       console.log(user)
       res.json({
           status:200,
           addresses : user.address
       }).status(200)
   
    }
    async updateProfile(req,res){
        const user = await User.findById(req.params.user)
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password
        const newPassword = req.body.newPassword
        
        console.log(firstName + " " + lastName + " " + address)
        user.address.push({
           firstName:firstName,
           lastName:lastName,
           address:address
       })
       await user.save()
       console.log(user)
       res.json({
           status:200,
           addresses : user.address
       }).status(200)
   
    }
    async getAddresses(req,res){
            const user = await User.findById(req.params.user)
            const addresses = user.address
            // console.log(addresses)
            res.json({
                status:200,
                addresses : addresses
            },200)
          
        
       
    }

}


module.exports = new AddressController