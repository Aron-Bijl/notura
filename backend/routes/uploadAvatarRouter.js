import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import sharp from "sharp";
import fs from "fs"; 
import path from 'path';
// const __dirname = path.resolve();

const __dirname = "../images";

const uploadAvatarRouter = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb("You can only upload images here.", false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });


uploadAvatarRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    async (req, res) => {
        const parts = req.file.mimetype.split("/");
        //const fullName = `Avatar-${Date.now()}.${parts[1]}`;
        const fullName = `Avatar-${req.user._id}.jpeg`;
        req.file.name = fullName;
        fs.access("../images/avatars", (err) => {
            if(err){
                fs.mkdirSync("../images/avatars")
            }
        }) 
        try{
            //find and delete previous thumnail or go to next step
            const PATH = path.join(__dirname, "./avatars", fullName);
            const DIR = __dirname + "/avatars";

            console.log(DIR);

            const files = fs.readdirSync(DIR);
            const exists = files.filter(filename => {
                if (filename === fullName) return fullName;
            });

            if(exists[0] === fullName){
                console.log("File already exists, I will delete the existing file and write the a one, that you have provided me");
                fs.unlink(PATH,(err) => {
                    if(err) throw err;
                });
            } 

            // create new thumbnail
            await sharp(req.file.buffer)
            .resize({
                width: 130,
                height: 130
            })
            .toFormat("jpeg")
            .toFile(`../images/avatars/${req.file.name}`);
            res.send(`/images/avatars/${req.file.name}`); 

        }catch(err){
            res.send(err);
        }
    }
); 

export default uploadAvatarRouter;