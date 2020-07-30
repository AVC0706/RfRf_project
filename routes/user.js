const express = require("express");
const User = require("../models/user");
const user_aoi = require("../models/user_aoi")
const isAuth = require("../middleware/auth"); 
const Mandal = require("../models/mandal")
const Member = require("../models/member");
const router = express.Router();

//******Funtions here :
//Update Profile , Delete Profile , reset password

router.get("/profile",isAuth,async (req,res) => {
    try {
        const user = req.user;
        const member = await Member.findById({user_id: req.user._id})
        const mandal = await Mandal.findById({_id: member.mandal_id});
        console.log(mandal);
        console.log(user)
        res.json({user,mandal})
    } catch(e) {
        res.status(404).send(e)
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
        res.status(400).send(e)
    }
})

router.delete("/deleteprofile",isAuth, async (req,res)=> {
    try {
        await req.user.remove()
        res.json({msg: "deleted successfully"})

    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router;