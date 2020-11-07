const express = require("express");
const User = require("../../models/user");
const Mandal = require("../../models/mandal")
const { isAdmin } = require("../../middleware/auth")


const router = express.Router();


//-----Routes---------

/* Get ::   /getMandals
            /getFalseMandals
                  


// Post ::


//Delete ::

//Update :: /approveMandal/:id   
            /makeBsmMember/:id

*/

//------Functions------


//-------Mandal----------

//Get all mandal for District Admin { approve : True }
router.get("/getMandals/:approve", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== 'district') {
        return res.status(401).send({ msg: "Not Authorised" })
    }

    try {
        const mandals = await Mandal.find({ districtApproved: req.params.approve, cityApproved: true, district: req.user.district });

        if (!mandals) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ mandals, msg: "All state mandal data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Get all mandal for District Admin { approve : false }
router.get("/getFalseMandals", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== 'district') {
        return res.status(401).send({ msg: "Not Authorised" })
    }

    try {
        const mandals = await Mandal.find({ districtApproved: false, district: req.user.district, cityApproved: true });

        if (!mandals) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ mandals, msg: "All state mandal data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});


//Approve Mandal
router.put("/approveMandal/:id", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== 'district') {
        return res.status(401).send({ msg: "Not Authorised" })
    }

    try {
        const mandal = await Mandal.findById(req.params.id)

        if (!mandal) {
            return res.status(204).json({ msg: "No data found" })
        }

        if (!user) {
            return res.status(204).json({ msg: "No user found" })
        }


        mandal.districtApproved = true

        await mandal.save()


        res.status(200).send({ mandal, msg: "Mandal Approved by districtAdmin" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }
});



//-------User----------


//Get all user for Prant Admin 
router.get("/getDistrictUsers", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== 'district') {
        return res.status(401).send({ msg: "Not Authorised" })
    }

    try {
        const users = await User.find({ district: req.user.district });

        if (!users) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ users, msg: "All state user data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Make user BSM member
router.put("/makeBsmMember/:id", isAdmin, async (req, res) => {
    //start


    if (req.user.admin !== 'district') {
        return res.status(401).send({ msg: "Not Authorised" })
    }


    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            return res.status(203).json({ msg: "No data found" })
        }

        user.bsm_member = true

        await user.save()


        res.status(200).send({ user, msg: "Mandal Approved" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }

});



module.exports = router;