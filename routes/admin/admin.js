const express = require("express");
const User = require("../../models/user");
const Member = require("../../models/member");
const User_Aoi = require("../../models/user_aoi");
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
    // await User_Aoi.deleteMany({user_id: user._id});

    res.status(200).send({ user, msg: "User Deleted" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});


module.exports = router;
