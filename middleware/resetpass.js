const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const mailgun = require("mailgun-js")
const DOMAIN = "sandboxae230cfa138a443a8857ca7526e79f09.mailgun.org";
const mg = mailgun({apiKey: "ec1ed583d02dac91eccb8d44309a9f94-0d2e38f7-74e17e3b", domain: DOMAIN});
const _ = require("lodash");


// function validateRecover(data) {
//     const schema = Joi.object({
//         email: Joi.string()
//             .email()
//             .required()
//     });
//     return schema.validate(data);
// };

const sendResetMail=  (req,res) => {
    //start
    const {email} = req.body;
    User.findOne({email},(err,user)=> {
        if(err || !user) {
            return res.status(400).json({error: "User with this email does not exist"});
        }
        const token = jwt.sign({_id: user._id},"kalemaam",{expiresIn: '20m'});
        const link = `http://localhost:3000/reset-pass/${token}`
        const data = {
            from: "Mailgun Sandbox <postmaster@sandboxae230cfa138a443a8857ca7526e79f09.mailgun.org>",
            to: email,
            subject: "Password change request",
            html: `Hi ${user.name} \n 
            Please click on the following <a href=${link}>Link</a> to reset your password. \n\n 
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        return user.updateOne({resetPasswordToken: token},function (err, success){
            if(err) {
                return res.status(400).json({error: "reset password link error"});
            } else {
                
    mg.messages().send(data, function (error, body) {
        if(error) {
            return res.json({
                error: "message error"
            })
        }
        return res.json({message: "email is sent to you"});
    });
            }
        })
    })


};

const resetPassword = (req,res) => {
    const {newPass} = req.body;
    const resetPasswordToken = req.params.id;
    if(resetPasswordToken) {
        jwt.verify(resetPasswordToken,"kalemaam", function (error,success) {
            if(error) {
                return res.status(401).json({error: "Incorrect tokrn or it is expired"});                
            }
            User.findOne({resetPasswordToken}, (err,user)=> {
                if(err || !user) {
                    return res.status(400).json({error: "User with this token does not exist"});                    
                }
                const obj = {
                    password: newPass,
                    resetPasswordToken: ''
                }
                user = _.extend(user,obj);
                console.log(user)
                user.save((err,result)=> {
                    if(err) {
                        return res.status(400).json({error:"reset password error"});
                    } else {
                        return res.status(200).send({message: "your password has been changed"})
                    }
                })
            })



        })
    } else {
        return res.status(401).json({error:"Authentication error"});
    }
}


module.exports = {
    sendResetMail,
    resetPassword
}