import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth } from '../utils.js';
import { spawn } from 'child_process';
import path from 'path';

const adminRouter = express.Router();

adminRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const recipes = await Recipe.aggregate([
            {
                $group: {
                    _id: null,
                    numRecipes: { $sum: 1},
                }
            }
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1},
                }
            }
        ]);
        res.send({ recipes, users });
    })
);


/* const __dirname = path.resolve(); */

const __dirname = "../";
//const __dirname = "./";

const DB_NAME = "notura-recipes";

const ARCHIVE_PATH = path.join(__dirname, "./backups", `${DB_NAME + "-" + Date.now()}.gzip`);
//const ARCHIVE_PATH = path.join(__dirname, "./notura/backups", `${DB_NAME + "-" + Date.now()}.gzip`);
//mongodump  --archive=./notura/backups/notura-recipies-1658732825280.gzip --db=notura --gzip
adminRouter.get(
    '/backup',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const child = spawn('mongodump',[
            `--archive=${ARCHIVE_PATH}`,
            `--db=${DB_NAME}`,
            `--gzip`
        ]);
    
        child.stdout.on("data", (data) => {
            console.log('stdout:\n', data);
        });
        child.stderr.on("data", (data) => {
            console.log('stderr:\n', Buffer.from(data).toString());
        });
        child.on("error", (error) => {
            console.log("Shit! The system threw this error:\n", error.message);
            res.status(400).send({ message: "Something went horribly wrong!" });
        })
        child.on("exit", (code, signal) => {
            if(code) console.log("Process exit with code:", code);
            else if(signal) console.log("Process killed with signal", signal);
            else{ 
                console.log("Backup successfull"); 
                res.status(200).send({ message: "Backup was executed successfully" });
            }
        })
       
    })
);

import fs from "fs";
const DIRECTORY_PATH = path.join(__dirname, "./backups"); 
//const DIRECTORY_PATH = path.join(__dirname, "./notura/backups");


function getLatestFile(dirpath) {

    // Check if dirpath exist or not right here
  
    let latest;
  
    const files = fs.readdirSync(dirpath);
    files.forEach(filename => {
      // Get the stat
      const stat = fs.lstatSync(path.join(dirpath, filename));
      // Pass if it is a directory
      if (stat.isDirectory())
        return;
  
      // latest default to first file
      if (!latest) {
        latest = {filename, mtime: stat.mtime};
        return;
      }
      // update latest if mtime is greater than the current latest
      if (stat.mtime > latest.mtime) {
        latest.filename = filename;
        latest.mtime = stat.mtime;
      }
    });
  
    return latest.filename;
  }

const RESTORE_FILE_NAME = getLatestFile(DIRECTORY_PATH);
const RESTORE_PATH = path.join(__dirname, "./backups", RESTORE_FILE_NAME);

adminRouter.get(
    '/restore',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        //mongorestore --gzip --db=notura-recipies   --archive=/Users/aron/Desktop/code/backend/backup/notura-recipies-1657870628468.gzip --drop
        //mongorestore --gzip --drop --nsInclude=noture-recipes --archive=/Users/aron/Desktop/code/backend/backup/notura-recipies-1657870628468.gzip
       const child = spawn("mongorestore",[
            '--gzip',
            '--drop',
            `--archive=${RESTORE_PATH}`,
        ]); 
    
        child.stdout.on("data", (data) => {
            console.log('stdout:\n', data);
        });
        child.stderr.on("data", (data) => {
            console.log('stderr:\n', Buffer.from(data).toString());
        });
        child.on("error", (error) => {
            console.log("Shit! The system threw this error:\n", error.message);
            res.status(400).send({ message: "Something went horribly wrong while restoring data!" });
        })
        child.on("exit", (code, signal) => {
            if(code) console.log("Process exit with code:", code);
            else if(signal) console.log("Process killed with signal", signal);
            else{ 
                console.log("Backup successfull"); 
                res.status(200).send({ message: "Your data has been restored" });
            }
        })

    }) 
);

export default adminRouter;