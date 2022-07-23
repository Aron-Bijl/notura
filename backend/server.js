import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import seedRouter from './routes/seedRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import userRouter from './routes/userRoutes.js';
import uploadRouter from './routes/uploadRouter.js';
import uploadThumbnailRouter from './routes/uploadThumbnailRouter.js';
import uploadAvatarRouter from './routes/uploadAvatarRouter.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch( err => {
    console.log(err.message)
});

const app = express();

//form data in post request will be transformed to JSON object in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/covers', uploadRouter);
app.use('/api/thumbnail', uploadThumbnailRouter);
app.use('/api/avatar', uploadAvatarRouter);
app.use('/api/seed', seedRouter);
app.use('/api/recipies', recipeRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

const __dirname = path.resolve();
app.use('/covers', express.static(path.join(__dirname, '/covers')));
app.use('/thumbnail', express.static(path.join(__dirname, '/thumbnail')));
app.use('/avatar', express.static(path.join(__dirname, '/avatar')));

app.get('/api/recipies', (req, res) => {
   res.send(data.recipies);
}); 

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`serve at 'http://localhost:${port}'`)
});