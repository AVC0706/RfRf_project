const express = require("express");
const User = require("../models/user");
const Mandal = require("../models/mandal");
const Member = require("../models/member")
const AOI = require("../../models/aoi");
const Mom = require("../models/mom");
const { isAdmin,isAuth } = require("../middleware/auth");


const router = express.Router();

router.post("/addmom", isAdmin, async (req, res) => {
    //start
    try {
      let member = await Member.findOne({user_id:req.user._id})
      const mom = new Mom({
          description: req.body.description,
          user_id: req.user._id,
          mandal_id: member.mandal_id
      })
      await mom.save();
      res.status(200).send({ mom, msg: "Minutes of meeting Added" });
  
    
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
    
  });

  router.get("/getmom", isAuth,async (req,res)=> {

    try {
        let member = await Member.find({user_id: req.user._id});
        let mom = await Mom.find({mandal_id: member.mandal_id});
        res.status(200).send({mom, msg: "seen mom"});

    } catch(e) {
        res.status(500).send(e.message);
    }
      

  })
  