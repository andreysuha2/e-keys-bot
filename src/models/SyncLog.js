import mongoose from "mongoose";

const SyncLog = mongoose.Schema({
    categories: { type: Object },
    count: { type: Number },
    date: { type: String },
    products: { type: Object },
    syncData: { type: Object }
}, { timestamps: true });

export default mongoose.model("SyncLog", SyncLog);