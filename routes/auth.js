var express = require("express");
var User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var router = express.Router();



//Register
router.post("/register", async (req, res) => {
    //start

    const { name, email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(409).json({ msg: "User Already Exists" });
      }
      user = new User({
        name,
        email,
        password,
      });
  
      await user.save();
  
      res.status(200).send({ msg: "Registration Successfull  !!" })
      
      //end
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  });



//Login
router.post("/login", async (req, res) => {
    //start
  
    const { email , password } = req.body;
  
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
          name:user.name,
          email:user.email
        },
      };
  
      jwt.sign(
        payload,
        "RfRf_project",
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token , payload });
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