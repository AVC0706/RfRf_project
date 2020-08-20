const express = require("express");
const User = require("../models/user");
const { isAuth, isAdmin } = require("../middleware/auth");
const router = express.Router();
const Mandal = require("../models/mandal");
// Create Mandal
// POST

router.post("/createMandal", isAdmin ,async (req, res) => {
  //   const { mandal_name, city, district, state, country } = req.body;
  try {
    let mandal = new Mandal(req.body);
    await mandal.save();
    res.status(200).send({ msg: "Mandal Registration Successful  !!" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// detele mandal
router.delete("/deleteMandal", isAdmin, async (req, res) => {
  try {

    // const members = await Members.findByIdAndDelete({
    //   mandal_id: req.params._id,
    // });
    const mandal = await Mandal.findByIdAndDelete({ _id: req.params._id });

    res.send({ mandal_aoi, members, mandal });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
