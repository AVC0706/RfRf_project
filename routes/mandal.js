const express = require("express");
const User = require("../models/user");
const {isAuth, isAdmin} = require("../middleware/auth");
const router = express.Router();
const Mandal = require("../models/mandal");
// Create Mandal
// POST

router.post("/createMandal", isAdmin, async (req, res) => {
    //   const { mandal_name, city, district, state, country } = req.body;
    console.log(req.body);

    try {
        let mandal = new Mandal(req.body);


        let user = await User.findOneAndUpdate({_id: req.user._id},
            {
                $push: {
                    mandals: {
                        mandal_id: mandal._id,
                        name: mandal.name,
                        role: "admin",
                    }
                }
            },
        );

        await mandal.save();

        res
            .status(200)
            .json({msg: "Mandal Registration Successful  !!", mandal, user});
        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});


//mandal/:id
router.get("/getMandal/:id", isAdmin, async (req, res) => {
    try {
        const mandal = await Mandal.findById({_id: req.params.id});
        let role = 'admin'
        const adminUser = await User.findOne({"mandals.mandal_id": req.params.id, "mandals.role": role})
        res.status(200).json({mandal, adminUser});
    } catch (e) {
        res.status(400).send(e);
    }
});

//getAllMembers
router.get("/getMembers/:id", isAuth, async (req, res) => {
    try {
        const members = await User.find({"mandals.mandal_id": req.params.id});
        
        res.status(200).json({members});
    } catch (e) {
        res.status(500).send(e);
    }
});

// detele mandal
router.delete("/deleteMandal/:id", isAdmin, async (req, res) => {
    try {
        // const members = await Members.findByIdAndDelete({
        //   mandal_id: req.params._id,
        // });
        const mandal = await Mandal.findByIdAndDelete({_id: req.params.id});

        res.send({mandal_aoi, members, mandal});
    } catch (e) {
        res.status(400).send(e);
    }
});


router.patch("/updateMandalProfile/:id", isAdmin, async (req, res) => {
    let updates = Object.keys(req.body)
    let allowed = ['name', 'city', 'district', 'state']
    const isValid = updates.every((update) => allowed.includes(update))
    if (!isValid) {
        return res.status(400).send({
            error: "not allowed"
        })
    }
    try {

        let mandal = Mandal.findById(req.params.id)
        updates.forEach((update) => mandal[update] = req.body[update])
        await mandal.save()
        res.status(200).json({mandal})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;
