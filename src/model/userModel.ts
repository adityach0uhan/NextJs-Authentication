import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, "Please Provide an username"]
    },
    emailid: {
        type: String,
        unique: true,
        require: [true, "Please Provide an Email"]
    },
    password: {
        type: String,
        require: true
    },
    verifyUserToken: String,
    verifyUserTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
});

const userModel = mongoose.model.users || mongoose.model('users', userSchema);
export default userModel;