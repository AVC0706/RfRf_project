var express = require("express");
var User = require("../models/user");
const Auth = require("../middleware/auth")

var router = express.Router();



//Register
router.post("/isAuth", Auth , async (req, res) => {
  //start
  console.log("This is isAuth");
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    mobile: req.user.mobile
  }
  res.json({ isAuth: true ,  msg: "Principal User" , user});
  //end
});



//Login
router.post("/login", async (req, res) => {
  //start

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      }
    );

    //end

  } catch (e) {
    //start
    console.error(e.message);
    res.status(500).send("Server Error");
  }

  //end
});


module.exports = router;