const express = require("express");
const User = require("../models/user");
const Mandal = require("../models/mandal");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

//******Funtions here :
//Admin Login

//-----Mandal--------
//Get all and single mandal for India admin and for Prant admin
//Approve Mandal , Delete Mandal

//--------User---------
//Get all and single user details for India admin and for Prant admin
//Make User BSM member

//AdminLogin
router.post("/adminlogin", async (req, res) => {
  //start

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }
    if (user.admin === "0") {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
    };

    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });

    //end
  } catch (e) {
    //start
    console.error(e.message);
    res.status(500).send("Server Error");
  }

  //end
});

//--------Mandal--------------

//Get all mandal for Prant Admin { approve : false }
router.get("/falsePrantMandals", isAdmin, async (req, res) => {
  //start

  try {
    const mandals = await Mandal.find({
      approve: false,
      state: req.user.state,
    });

    if (!mandals) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ mandals, msg: "All state mandal data" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
  //end
});

//Get all mandal for Prant Admin { approve : true }
router.get("/getAllPrantMandals", isAdmin, async (req, res) => {
  //start

  try {
    const mandals = await Mandal.find({ approve: true, state: req.user.state });

    if (!mandals) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ mandals, msg: "All state mandal data" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
  //end
});

//Get all mandal for India Admin
router.get("/getAllIndiaMandal", isAdmin, async (req, res) => {
  //start

  try {
    const mandals = await Mandal.find({ approve: true });

    if (!mandals) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ mandals, msg: "All state mandal data" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

//Get single Mandal detail
router.get("/getMandal/:id", isAdmin, async (req, res) => {
  //start

  try {
    const mandal = await Mandal.findById(req.param.id);

    if (!mandal) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ mandal, msg: "Mandal Fetched" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

//Approve Mandal
router.put("/approveMandal/:id", isAdmin, async (req, res) => {
  //start

  try {
    const mandal = await Mandal.findById(req.param.id);

    if (!mandal) {
      return res.status(204).json({ msg: "No data found" });
    }

    mandal[approve] = true;
    await mandal.save();
    res.status(200).send({ mandal, msg: "Mandal Approved" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

//Delete or disapprove mandal
router.delete("/approveMandal/:id", isAdmin, async (req, res) => {
  //start

  try {
    const mandal = await Mandal.findOneAndDelete({ _id: req.param.id });

    if (!mandal) {
      return res.status(204).json({ msg: "No data found" });
    }

    res.status(200).send({ mandal, msg: "Mandal Not Approved And Deleted" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

//---------------USER------------------

//Get all user for Prant Admin
router.get("/getAllPrantUser", isAdmin, async (req, res) => {
  //start

  try {
    const users = await User.find({ state: req.user.state });

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

//Get all user for India Admin
router.get("/getAllIndiaUser", isAdmin, async (req, res) => {
  //start

  try {
    const users = await User.find({ country: req.user.country });

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

//Make user BSM member
router.put("/makeBsmMember/:id", isAdmin, async (req, res) => {
  //start

  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(203).json({ msg: "No data found" });
    }

    user.bsm_member = true;

    await user.save();

    res.status(200).send({ user, msg: "Mandal Approved" });

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
    //end
  }
});

module.exports = router;
