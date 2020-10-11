const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const mailgun = require("mailgun-js")
const DOMAIN = "sandboxc9f391a9186b4328b48e9600aeecdbb3.mailgun.org";
const mg = mailgun({apiKey:"44d0409ec0646f52a3ef325cb2feed4e-0d2e38f7-6dd8cb4b", domain: DOMAIN});
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
    console.log(email)
    User.findOne({email},(err,user)=> {
        if(err || !user) {
            return res.status(400).json({error: "User with this email does not exist"});
        }
        const token = jwt.sign({_id: user._id},"kalemaam",{expiresIn: '20m'});
        const link = `http://localhost:3000/reset-pass/${token}`
        const data = {
            from: 'noreply@hello.com',
            to: email,
            subject: "Password change request",
            text: `${link}`
        };

        return user.updateOne({resetPasswordToken: token},function (err, success){
            if(err) {
                return res.status(400).json({error: "reset password link error"});
            } else {
                
    mg.messages().send(data, function (error, body) {
        if(error) {
            return res.status(400).json({
                error: "message error"
            })
            console.log(body)
        }
        return res.json({message: "email is sent to you"});
    });
            }
        })
    })


};

const resetPassword = (req,res) => {
    const {password} = req.body;
    console.log(password);
    const resetPasswordToken = req.params.id;
    if(resetPasswordToken) {
        jwt.verify(resetPasswordToken,"kalemaam", function (error,success) {
            if(error) {
                return res.status(401).json({error: "Incorrect token or it is expired"});                
            }
            User.findOne({resetPasswordToken}, (err,user)=> {
                if(err || !user) {
                    return res.status(400).json({error: "User with this token does not exist"});                    
                }
                const obj = {
                    password: password,
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