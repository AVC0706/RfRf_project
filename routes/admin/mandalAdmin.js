const express = require("express");
const User = require("../../models/user");
const Mandal = require("../../models/mandal");
const {isAdmin} = require("../../middleware/auth");

const fs = require("fs");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const user = require("../../models/user");

global.__basedir = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage: storage});

const excelMemberUpload = (filePath) => {
    //start
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [
            {
                // Excel Sheet Name
                name: "Members",

                // Header Row -> be skipped and will not be present at our result object.
                header: {
                    rows: 1,
                },

                // Mapping columns to keys
                columnToKey: {
                    B: "name",
                    C: "email",
                    // D: "state",
                },
            },
        ],
    });

    fs.unlinkSync(filePath);

    return excelData;
    //end
};

const router = express.Router();

//-----Routes---------

// Get ::

// Post :: "/addMember"

//Delete ::
//Update ::

//------Members----------

router.post("/addMember", /*isAdmin,*/ async (req, res) => {
    //start

    console.log(req.body.user);
    const {name, email, password} = req.body.user;

    try {
        //start
        let user = await User.findOne({email});

        console.log(user, 'hererere');

        if (user) {
            //start

            let userMandal = await User.findOne({
                _id: user._id,
                "mandals.mandal_id": req.body.mandal_id,
            });

            console.log("usermandal", userMandal);
            if (userMandal) {
                return res
                    .status(409)
                    .json({userMandal, msg: "Member Already exist !!"});
            }

            user.mandals.push({mandal_id: req.body.mandal_id, role: req.body.role, name: req.body.mandal_name});
            await user.save();

            return res.status(200).json({user, msg: "Member Added"});
        }

        console.log(req.body.user)
        user = new User(req.body.user);

        user.mandals.push({mandal_id: req.body.mandal_id, role: req.body.role, name: req.body.mandal_name});

        console.log(user);
        await user.save();

        res.status(200).send({user, msg: "Registration Successfull  !!"});

        //end
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});

router.post(
    "/addMemberExcel",
    upload.single("uploadfile"),
    isAdmin,
    async (req, res) => {
        //start
        console.log(req.file);
        const excelData = excelMemberUpload(
            __basedir + "/uploads/" + req.file.filename
        );
        console.log(excelData.Members.length);

        try {
            //start

            const returns = excelData.Members.map(async (member) => {
                //start
                console.log(member.email);
                let email = member.email;
                let user = await User.findOne({email});

                // console.log(user);

                if (user) {
                    //start

                    let userMandal = await User.findOne({
                        _id: user._id,
                        "mandals.mandal_id": req.body.mandal,
                    });

                    console.log("usermandal", userMandal);

                    if (userMandal) {
                        return userMandal;
                    }

                    user.mandals.push({mandal_id: req.body.mandal_id, role: req.body.role, name: req.body.mandal_name});

                    await user.save();

                    return user;
                }

                user = new User(member);

                user.mandals.push({mandal_id: req.body.mandal_id, role: req.body.role, name: req.body.mandal_name});

                console.log(user);
                await user.save();

                return user;
            });

            const users = await Promise.all(returns);

            // let users = await User.insertMany(excelData.Members);
            // users[0].mandals.push({ mandal_id: "test" });

            console.log(users.length);
            console.log(users);
            res.status(200).json({users, msg: "Members Added !!"});

            //end
        } catch (e) {
            res.send({msg: "erroe", e});
        }

        //end
    }
);

module.exports = router;

// let user1 = await User.findOne({
//   'aoi': { $in: [
//       "Law"
//   ]}})
//   user1.aoi.push("Random");
//  let user1 = await User.find({
// 'aoi': 'Law' })
