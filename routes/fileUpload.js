require("dotenv").config();
const express = require("express");
const Document = require("../models/Document");
const multer = require("multer");
let AWS = require("aws-sdk");
const {isAdmin, isAuth} = require("../middleware/auth");

let storage = multer.memoryStorage();
let upload = multer({storage: storage});

// Route to get a single existing GO data (needed for the Edit functionality)
router.get("/:id", isAuth, (req, res, next) => {
    Document.findById(req.params.id, (err, go) => {
        if (err) {
            return next(err);
        }
        res.json(go);
    });
});

// route to upload a pdf Document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/upload/:id", upload.single("file"), isAdmin, function (req, res) {
    const file = req.file;
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);

    //Where you want to store your file

    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };

    s3bucket.upload(params, function (err, data) {
        if (err) {
            res.status(500).json({error: true, Message: err});
        } else {
            res.send({data});
            var newFileUploaded = {
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key,
                meeting_id: req.params.id,
            };
            var Document = new Document(newFileUploaded);
            Document.save(function (error, newFile) {
                if (error) {
                    throw error;
                }
                res.json("upload successfully")
            });
        }
    });
});