const express = require("express");
const User = require("../models/user");
const {isAuth} = require("../middleware/auth");
const Mandal = require("../models/mandal")
const router = express.Router();
const {sendResetMail, resetPassword} = require("../middleware/resetpass");

//******Funtions here :
//Update Profile , Delete Profile , reset password

router.get("/profile/:id", isAuth, async (req, res) => {
    try {

        const user = await User.findById({_id: req.params.id});
        console.log(user)
        res.status(200).json({user})


    } catch (e) {
        res.status(500).send(e)
    }
})


router.get("/myMandals", isAuth, async (req, res) => {

    res.status(200).json({user: req.user, msg: "All user mandals received !!"})


})


router.patch("/updateProfile", isAuth, async (req, res) => {
    let updates = Object.keys(req.body)
    let allowed = ['name', 'email', 'city', 'district', 'state', 'country', 'qualification']
    const isValid = updates.every((update) => allowed.includes(update))
    if (!isValid) {
        return res.status(400).send({
            error: "not allowed"
        })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).json({user: req.user})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete("/deleteprofile", isAuth, async (req, res) => {
    try {
        var user = await User.findOneAndDelete({_id: req.user._id})
        await user.remove()
        res.send(200).json({msg: "deleted successfully"})

    } catch (e) {
        res.status(500).send()
    }
})

router.put("/forget-pass", sendResetMail);
router.put("/reset-pass/:id", resetPassword);

module.exports = router;