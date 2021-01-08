require("dotenv").config();
const express = require("express");
const Document = require("../models/Document");
// const multer = require("multer");
let aws = require("aws-sdk");
const Publication = require("../models/publication");
const {isAdmin, isAuth} = require("../middleware/auth");
const {Router} = require("express");
const auth = require("../middleware/auth");
const router = Router();
const s3Bucket = process.env.AWS_BUCKET_NAME

router.post("/uploadfile", isAdmin, async (req, res) => {
    try {
        console.log(req.body);
        const {filename, filetype} = req.body;
        console.log(filename);
        console.log(filetype);
        const s3 = new aws.S3({
            AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
            region: process.env.AWS_REGION
        });

        const s3Params = {
            Bucket: s3Bucket,
            Key: filename,
            Expires: 60,
            ContentType: filetype,
            ACL: 'public-read',
        };
        const signedRequest = await s3.getSignedUrl('putObject', s3Params);
        const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
        console.log(url);
        res.json({signedRequest, url})
    } catch (e) {
        res.status(400).json({msg: "error occured upload failed"})
    }
});

router.post("/addindb/:id", isAuth, async (req, res) => {
    try {
        const {signedRequest, url} = req.body;
        const meeting_id = req.params.id;
        const document = new Document({
            signedRequest,
            url,
            meeting_id
        });
        await document.save();
        res.json({msg: "document added in db"});
    } catch (e) {
        res.status(400).json({msg: "error while updating the db"});
    }
})

router.post("/addindbpub", isAdmin, async (req, res) => {
    try {
        const {name, author, signedRequest, url} = req.body;
        console.log(name, author);
        const document = new Publication({
            name,
            author,
            signedRequest,
            url,
        });
        await document.save();
        res.json({msg: "document added in db"});
    } catch (e) {
        res.status(400).json({msg: "error while updating the db"});
    }
});

router.get("/getmomurl/:id", isAuth, async (req, res) => {
    try {
        const momobject = await Document.findOne({meeting_id: req.params.id});
        res.json(momobject.url);
    } catch (e) {
        res.status(400).json({msg: "some error"});
    }
})

router.get("/getpublication", isAuth, async (req, res) => {
    try {
        const pubobject = await Publication.find({});
        console.log(pubobject);
        res.json(pubobject)
    } catch (e) {
        res.status(400).json({msg: "some error"});
    }
})


module.exports = router;