import mongoose from "mongoose";

const Subscribers = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    userId: { type: Number },
    subscribed: { type: Boolean, default: false },
    allowed: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Subscribers", Subscribers);