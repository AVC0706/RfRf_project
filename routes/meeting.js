const Meeting = require("../models/meeting");
const Member = require("../models/member");
const Mandal = require("../models/mandal");
const {isAuth, isAdmin} = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/createmeeting",isAdmin,async (req,res)=> {
    const {agenda,mom_tags,mandal_id} = req.body
    try {
       const meeting = new Meeting({
           agenda,
           mom_tags,
           mandal_id,
           user_id: req.user._id
       })

       await meeting.save()
        res.status(201).send({meeting});
    } catch(e) {
        res.status(500).send({msg: "Server error"})
    }
});

router.put("/updatemeeting/:id",isAdmin, async (req,res)=> {
    console.log(req.body);
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) {
            return res.status(204).json({ msg: "No data found" })
        } 

        meeting.agenda = req.body.agenda;
        meeting.mom_tags = req.body.mom_tags;
        await meeting.save()
        res.status(200).send({meeting})
    } catch(e) {
        res.status(500).send({msg: "Server error"})
    }
});

//get meeting
router.get("/getmeeting", async(req,res)=> {
    
    try {
        const meeting = await Meeting.findById(req.params.id);
        res.status(200).send(meeting);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({msg :"Server Error"});
    }

});

//delete meeting
router.delete("/deletemeeting/:id", isAdmin, async(req,res)=> {

    try {
        const meeting = await Meeting.findOneAndDelete(req.params.id);
        if (!meeting) {
            return res.status(204).json({ msg: "No data found" })
        }

        res.status(200).send({ aoi , msg: "Deleted meeting data" });

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }

});


module.exports = router