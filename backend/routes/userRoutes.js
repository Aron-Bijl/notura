import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import e from 'express';

const userRouter = express.Router();

userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );
  
  userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
  );

userRouter.post(
    '/login', expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    imgAuthor: user.imgAuthor,
                    token: generateToken(user),
                });
                return;
            }
        }else{
            res.status(401).send({ message: "Invalid email of password" });
        }
    })
);

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            imgAuthor: '/images/avatars/avatar12.png',
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            imgAuthor: user.imgAuthor,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
        return;
    })
);

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.imgAuthor = req.body.imgAuthor || user.imgAuthor;
            if (req.body.password){
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                imgAuthor: updatedUser.imgAuthor,
                token: generateToken(updatedUser),
            });
        }else{
            res.status(404).send({message: 'Sorry, I was unable to find you' })
        }
    })
);

userRouter.post(
    '/settings',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if(user){
            user.settings = req.body.settings || user.settings;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                settings: updatedUser.settings,
            });
        }else{
            res.status(404).send({message: 'Sorry, I was unable to find you' })
        }
    })
);

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.send({ message: "User updated", user: updatedUser });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
  );

  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
        if (user){
            if(user.isAdmin){
                res.status(400).send({ message: "Can not delete admin users" });
                return;
            }else{
                await user.remove();
                res.send({ message: "User deleted" });
            }
        }else{
            res.status(404).send({ message: "User not found" });
        }
    })
  );


export default userRouter;