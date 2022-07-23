import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, sparse: true },
        email: { type: String, required: true, unique: true, sparse: true },
        password: { type: String, required: true },
        imgAuthor: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        settings: { type: String, required: false },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;