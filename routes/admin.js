var express = require("express");
var User = require("../models/user");
const Mandal = require("../models/mandal")
const { isAdmin, isAuth } = require("../middleware/auth")


var router = express.Router();


//******Funtions here :
//Admin Login
//Get all and single mandal for India admin and for Prant admin 
//Approve Mandal , Delete Mandal , Make User BSM member 
// 

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
            return res.status(401).json({ msg: "Invalid Email or Password" });
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
                admin: user.admin
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
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


//Get all mandal for India Admin
router.get("/getAllPrantMandal", isAdmin, async (req, res) => {
    //start

    try {
        const mandals = await Mandal.find({ approve: false, state: req.user.state });

        if (!mandals) {
            return res.status(204).json({ msg: "No data found", mandals })
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
            return res.status(204).json({ msg: "No data found", mandals })
        }

        res.status(200).send({ mandals, msg: "All state mandal data" });

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
        //end
    }
});


module.exports = router;