const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {isAdmin, isAuth} = require("../middleware/auth")


const router = express.Router();


//******Funtions here :
//Register , Login , isAuth , isAdmin


//Register
router.post("/register", /* "Add HandleRecaptha here" */  async (req, res) => {
    //start
    console.log(req.body)
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        console.log(user)

        if (user) {
            return res.status(409).json({msg: "User Already Exists"});
        }
        user = new User(req.body);

        await user.save();

        res.status(200).send({msg: "Registration Successfull  !!"})

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});


//Login
router.post("/login", async (req, res) => {
    //start
    console.log(req.body)

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({msg: "Invalid Email or Password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({msg: "Invalid Email or Password"});
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            (err, token) => {
                if (err) throw err;
                res.json({token, payload});
            }
        );

        //end

    } catch (e) {
        //start
        console.error(e.message);
        res.status(500).send({msg: "Server Error"});
    }

    //end
});


//isAuth
router.get("/isAuth", isAuth, async (req, res) => {
    //start
    console.log("This is isAuth");
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        mobile: req.user.mobile,
        admin: req.user.admin
    }
    res.json({isAuth: true, msg: "Auth User", user});
    //end
});


//isAdmin
router.get("/isAdmin", isAdmin, async (req, res) => {
    //start

    console.log("This is isAuth");
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        mobile: req.user.mobile,
        admin: req.user.admin,
    }
    res.json({isAuth: true, msg: "Admin User", user});

    //end
});

router.put("/forget-password", async (req, res) => {
    const {email} = req.body
    try {
        const user = User.findOne({email});
        if (!user) {
            return res.status(400).send({msg: "user doesnt not exist"})
        }
        const token = jwt.sign({_id: user._id}, config.get("jwtSecret"))
    } catch (e) {
        res.status(500).send({msg: "server error"})
    }
})

module.exports = router;