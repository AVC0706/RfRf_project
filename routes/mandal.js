const express = require("express");
const User = require("../models/user"); 
const {isAuth,isAdmin} = require("../middleware/auth");
const Mandal = require("../models/mandal");
const router = express.Router();
const Mandal_aoi = require("../models/mandal_aoi");
const Members = require("../models/member");

router.delete("/deleteMandal",isAdmin, async (req,res)=> {
    try {
        const mandal_aoi = await Mandal_aoi.findByIdAndDelete({mandal_id:req.params._id})
        const members = await Members.findByIdAndDelete({mandal_id:req.params._id})
        const mandal = await Mandal.findByIdAndDelete({_id:req.params._id});

        res.send({mandal_aoi,members,mandal});

    } catch(e) {
        res.status(400).send(e)
    }
})