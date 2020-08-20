const express = require("express");
const User = require("../../models/user");
const Mandal = require("../../models/mandal");
const AOI = require("../../models/aoi");
const { isAdmin } = require("../../middleware/auth");

const router = express.Router();

//-----------For Common admins features-------------

//-----Routes---------

/* Get ::  
                  
// Post ::


//Delete ::

//Update :: 

*/

//------Functions------

//Delete user
router.delete("/deleteUser/:id", isAdmin, async (req, res) => {
  //start

  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(203).json({ msg: "No data found" });
    }

    // await Member.deleteMany({user_id: user._id});

    res.status(200).send({ user, msg: "User Deleted" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

//Get all city user
router.get("/getAdmins/:admin", isAdmin, async (req, res) => {
  //start

  if (req.user.admin === "null") {
    return res.status(401).send({ msg: "Not Authorised" });
  }
  
  try {
    let users = null;
    if (req.user.admin === "state") {
      users = await User.find({
        state: req.user.state,
        admin: req.params.admin,
      });
    } else if (req.user.admin === "district") {
      users = await User.find({
        state: req.user.state,
        district: req.user.district,
        admin: req.params.admin,
      });
    } else if (req.user.admin === "city") {
      users = await User.find({
        state: req.user.state,
        district: req.user.district,
        city: req.user.city,
        admin: req.params.admin
      });
    }

    if (!users) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ users, msg: "All state user data" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
  //end
});

module.exports = router;
