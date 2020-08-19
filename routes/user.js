const express = require("express");
const User = require("../models/user");
const {isAuth} = require("../middleware/auth"); 
const Mandal = require("../models/mandal")
const router = express.Router();

//******Funtions here :
//Update Profile , Delete Profile , reset password

router.get("/profile",isAuth,async (req,res) => {
    try {
        const member = await Member.findById({user_id: req.user._id})
        const mandal = await Mandal.findById({_id: member.mandal_id});
        console.log(mandal);
        console.log(user)
        res.status(200).json({user,mandal})
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch("/updateprofile",isAuth, async(req,res)=> {
    let updates = Object.keys(req.body)
    let allowed = ['name','email','mobile','city','district','state','country','qualification']
    const isValid = updates.every((update)=> allowed.includes(update))
    if(!isValid) {
        return res.status(400).send({
            error: "not allowed"
        })
    }
    try {
        updates.forEach((update)=>req.user[update]= req.body[update])
        await req.user.save()
    }
    catch(e) {
        res.status(500).send(e)
    }
})

router.delete("/deleteprofile",isAuth, async (req,res)=> {
    try {
        var user = await User.findOneAndDelete({_id : req.user._id})
        await user.remove()
        res.send(200).json({msg: "deleted successfully"})

    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router;