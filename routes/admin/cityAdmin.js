const express = require("express");
const User = require("../../models/user");
const Mandal = require("../../models/mandal");
const AOI = require("../../models/aoi");
const {isAdmin} = require("../../middleware/auth");


const router = express.Router();


//-----Routes---------

/* Get ::   /getMandals:approve
            
            /getUsers/:admin"
                  


// Post ::


//Delete ::

//Update :: /approveMandal/:id   
            /makeBsmMember/:id

*/

//------Functions------

//------AOI--------

//Add AOI
router.post("/addAoi", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== "city") {
        return res.status(401).send({msg: "Not Authorised"});
    }

    try {
        let aoi = await AOI.find({name: req.body.name});

        if (aoi) {
            return res.status(409).json({msg: "Already Exist"});
        }

        aoi = new AOI({name: req.body.name});

        res.status(200).send({aoi, msg: "Area of interest Added"});

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});


//-------Mandal----------

//Get all mandal for City Admin { approve }
router.get("/getMandals/:approve", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== "city") {
        return res.status(401).send({msg: "Not Authorised"});
    }

    try {
        const mandals = await Mandal.find({
            cityApproved: req.params.approve,
            city: req.user.city,
        });

        if (!mandals) {
            return res.status(204).json({msg: "No data found"});
        }

        res.status(200).send({mandals, msg: "All state mandal data"});

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});


//Approve Mandal
router.patch("/approveMandal/:id", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== "city") {
        return res.status(401).send({msg: "Not Authorised"});
    }

    try {
        console.log(req.params.id)
        let mandal = await Mandal.findById(req.params.id);

        if (!mandal) {
            return res.status(204).json({msg: "No data found"});
        }

        mandal.cityApproved = true;

        await mandal.save();

        res.status(200).send({mandal, msg: "Mandal Approved by cityAdmin"});

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }
});


//-------User----------

//Get all user for City Admin
router.get("/getUsers/:admin", isAdmin, async (req, res) => {
    //start

    if (req.user.admin !== "city") {
        return res.status(401).send({msg: "Not Authorised"});
    }

    try {
        const users = await User.find({city: req.user.city, admin: req.params.admin});

        if (!users) {
            return res.status(204).json({msg: "No data found"});
        }

        res.status(200).send({users, msg: "All state user data"});

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

    if (req.user.admin !== "city") {
        return res.status(401).send({msg: "Not Authorised"});
    }

    try {
        let user = await User.findOne({_id: req.params.id});

        if (!user) {
            return res.status(203).json({msg: "No data found"});
        }

        user.bsm_member = true;

        await user.save();

        res.status(200).send({user, msg: "Mandal Approved"});

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }
});

module.exports = router;
