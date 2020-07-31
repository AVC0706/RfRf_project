const express = require("express");
const AOI = require("../../models/aoi")
const { isAdmin } = require("../../middleware/auth")


const router = express.Router();


//-----Routes---------

/* Get ::   /getAoi              


// Post ::  /addAoi


//Delete :: /deleteAoi/:id

//Update :: /updateAoi/:id

*/

//------Functions------



//Add AOI 
router.post("/addAoi", isAdmin , async (req, res) => {
    //start


    try {
        const aoi = await AOI.find({ name : req.body.name });

        if (aoi) {
            return res.status(409).json({ msg: "Already Exist" })
        }

        aoi = new AOI({ name : req.body.name })

        res.status(200).send({ aoi , msg: "Area of interest Added" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Get all AOI
router.get("/getAoi", isAdmin, async (req, res) => {
    //start


    try {
        const aoi = await AOI.find({});

        res.status(200).send({ aoi, msg: "All AOI data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Update Aoi 
router.update("/updateAoi/:id", isAdmin, async (req, res) => {
    //start


    try {
        const aoi = await AOI.find( { _id: req.params.id } )  

        if (!aoi) {
            return res.status(204).json({ msg: "No data found" })
        }

        aoi.name = req.body.name
        await aoi.save()

        res.status(200).send({ aoi , msg: "Deleted aoi data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});



//Delete Aoi
router.delete("/deleteAoi/:id", isAdmin, async (req, res) => {
    //start


    try {
        const aoi = await AOI.findOneAndDelete( { _id: req.params.id } )  

        if (!aoi) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ aoi , msg: "Deleted aoi data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
    //end
});






module.exports = router;