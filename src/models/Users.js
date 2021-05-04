import mongoose from "mongoose";
import md5 from "md5";

const Users = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

Users.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return next();

    user.password = md5(user.password);

    next();
});

Users.methods.comparePassword = function (compared) {
    return this.password === md5(compared);
}


export default mongoose.model("Users", Users);