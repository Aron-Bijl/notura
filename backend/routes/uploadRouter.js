/*
import multer from "multer";
import express from "express";
import { isAdmin, isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'covers');
    },
    filename: (req, file, cb) =>{
        const parts = file.mimetype.split("/");
        const fullName = 
        `CoverImg-${Date.now()}.${parts[1]}`;
        cb(null, fullName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

uploadRouter.post(
    '/',
    isAuth,
    isAdmin,
    upload.single('image'),
    (req, res) => {
        // res.sendFile(`${__dirname}/${req.file.filename}`);
        res.send(`/${req.file.path}`);
    }
);

export default uploadRouter;

*/

import multer from "multer";
import express from "express";
import { isAdmin, isAuth } from "../utils.js";
import sharp from "sharp";
import fs from "fs"; 
import path from 'path';
// const __dirname = path.resolve();

const __dirname = "../images";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb("You can only upload images here.", false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

uploadRouter.post(
    '/',
    isAuth,
    isAdmin,
    upload.single('image'),
    async (req, res) => {
        //const parts = req.file.mimetype.split("/");
        //const fullName = `Thumbnail-${Date.now()}.${parts[1]}`;
        const fullName = `Cover-${req.body.id}.jpeg`;
        req.file.name = fullName;
        fs.access("../images/covers", (err) => {
            if(err){
                fs.mkdirSync("../images/covers")
            }
        })
        try{
             //find and delete previous thumnail or go to next step
             const PATH = path.join(__dirname, "./covers", fullName);
             const DIR = __dirname + "/covers";
 
             const files = fs.readdirSync(DIR);
             const exists = files.filter(filename => {
                 if (filename === fullName) return fullName;
             });
             if(exists[0] === fullName){
                 fs.unlink(PATH,(err) => {
                     if(err) throw err;
                 });
             }
             // create new cover
            await sharp(req.file.buffer)
            .resize({
                width: 1110,
                height: 624
            })
            .toFormat("jpeg")
            .toFile(`../images/covers/${req.file.name}`);
            res.send(`/images/covers/${req.file.name}`);
        }catch(err){
            res.send(err);
        }
    }
);

export default uploadRouter;