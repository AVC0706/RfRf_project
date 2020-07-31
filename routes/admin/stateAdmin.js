const express = require("express");
const User = require("../../models/user");
const Mandal = require("../../models/mandal")
const { isAdmin } = require("../../middleware/auth")


const router = express.Router();


//-----Routes---------

/* Get ::   /getMandals
            /getDistrictMandals
            /getCityAdmins      
            /getDistrictAdmins
            /getMandalAdmins


// Post ::


//Delete :: /deleteAdmin/:id

//Update :: /makeDistrictAdmin/:id

*/

//------Functions------



//-------Mandal----------

//Get all mandal for State Admin { approve : True }
router.get("/getMandals", isAdmin, async (req, res) => {
    //start

    if( req.user.admin !== 'state' ){
        return res.status(401).send( { msg : "Not Authorised" } )
    }

    try {
        const mandals = await Mandal.find({ cityApproved: true , districtAdmin: true , state: req.user.state });

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



//Get all district mandal for State Admin 
router.get("/getDistrictMandals", isAdmin, async (req, res) => {
    //start

    if( req.user.admin !== 'state' ){
        return res.status(401).send( { msg : "Not Authorised" } )
    }

    const { city , district }

    try {


        const mandals = await Mandal.find({ cityApproved: true , districtApproved: true , district: req.params.district});

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





//-------User----------


//Get all city user  
router.get("/getCityAdmins", isAdmin, async (req, res) => {
    //start

    if( req.user.admin !== 'state' ){
        return res.status(401).send( { msg : "Not Authorised" } )
    }

    try {
        const users = await User.find({ state: req.user.state , admin: "city"});

        if (!users) {
            return res.status(204).json({ msg: "No data found"})
        }

        res.status(200).send({ users, msg: "All state user data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Get all district admins 
router.get("/getDistrictAdmins", isAdmin, async (req, res) => {
    //start

    if( req.user.admin !== 'state' ){
        return res.status(401).send( { msg : "Not Authorised" } )
    }

    try {
        const users = await User.find({ state: req.user.state , admin: "district"});

        if (!users) {
            return res.status(204).json({ msg: "No data found"})
        }

        res.status(200).send({ users, msg: "All state user data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Get all mandal admins 
router.get("/getMandalAdmins", isAdmin, async (req, res) => {
    //start

    if( req.user.admin !== 'state' ){
        return res.status(401).send( { msg : "Not Authorised" } )
    }

    try {
        const users = await User.find({ state: req.user.state , admin: "mandal"});

        if (!users) {
            return res.status(204).json({ msg: "No data found"})
        }

        res.status(200).send({ users, msg: "All state user data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Make user District admin0
router.put("/makeDistrictAdmin/:id", isAdmin, async (req, res) => {
    //start

    try {
        const user = await User.findOne({_id: req.params.id })  

        if (!user) {
            return res.status(203).json({ msg: "No data found" })
        }

        user.admin = "district"

        await user.save()


        res.status(200).send({ user , msg: "Mandal Approved" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }

});


//Delete Admin users
router.delete("/deleteAdmin/:id", isAdmin, async (req, res) => {
    //start
    
    try {
        const user = await User.findOneAndDelete( { _id: req.params.id } )  

        if (!user) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ user , msg: "Admin Deleted" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }
});




module.exports = router;