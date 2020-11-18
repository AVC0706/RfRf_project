const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user")

const isAuth = async (req, res, next) => {
    //start

    console.log("isAuth");
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({msg: "No Token"});
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const user = await User.findById(decoded.user.id);

        if (!user) {
            res.status(401).json({msg: "Authentication Error"});
        }

        req.token = token;
        req.user = user;

        next();

        //end
    } catch (e) {
        res.status(401).json({msg: "Please authenticate"});
    }
};

const isAdmin = async (req, res, next) => {
    //start

    console.log("isAdmin");
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({msg: "No Token"});
    }

    try {

        const decoded = jwt.verify(token, config.get("jwtSecret"));

        const user = await User.findById(decoded.user.id);

        if (!user) {

            return res.status(401).json({msg: "Authentication Error"});
        }

        if (user.admin === "null") {

            return res.status(401).json({msg: "Not Authorised"});
        }

        req.token = token;
        req.user = user;

        next();

        //end
    } catch (e) {
        res.status(401).json({msg: "Please authenticate"});
    }
};


module.exports = {isAuth, isAdmin};