import multer from "multer";
import express from "express";
import { isAdmin, isAuth } from "../utils.js";
import sharp from "sharp";
import fs from "fs"; 
import path from 'path';
const __dirname = path.resolve();

const uploadThumbnailRouter = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb("You can only upload images here.", false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

uploadThumbnailRouter.post(
    '/',
    isAuth,
    isAdmin,
    upload.single('image'),
    async (req, res) => {
        //const parts = req.file.mimetype.split("/");
        //const fullName = `Thumbnail-${Date.now()}.${parts[1]}`;
        const fullName = `Thumbnail-${req.body.id}.jpeg`;
        req.file.name = fullName;
        fs.access("./thumbnail", (err) => {
            if(err){
                fs.mkdirSync("./thumbnail")
            }
        })
        try{
             //find and delete previous thumnail or go to next step
             const PATH = path.join(__dirname, "./thumbnail", fullName);
             const DIR = __dirname + "/thumbnail";
 
             const files = fs.readdirSync(DIR);
             const exists = files.filter(filename => {
                 if (filename === fullName) return fullName;
             });
             if(exists[0] === fullName){
                 fs.unlink(PATH,(err) => {
                     if(err) throw err;
                 });
             }
             // create new thumbnail
            await sharp(req.file.buffer)
            .resize({
                width: 350,
                height: 263
            })
            .toFormat("jpeg")
            .toFile(`./thumbnail/${req.file.name}`);
            res.send(`/thumbnail/${req.file.name}`);
        }catch(err){
            res.send(err);
        }
    }
);

export default uploadThumbnailRouter;