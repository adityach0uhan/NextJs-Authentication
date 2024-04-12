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
    isVerified: {
        type: Boolean,
        default:false,
    },
    idAdmin: {
        type: Boolean,
        default:false,
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

const userModel = mongoose.models.users || mongoose.model('users', userSchema );
export default userModel;