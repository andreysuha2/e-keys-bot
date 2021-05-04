import mongoose from "mongoose";

export default () => new Promise((resolve, reject) => {
    mongoose.connect(
        process.env.MONGO_HOST,
        {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    ).then(() => {
        console.log("Mongo connected!");
        resolve();
    }).catch((e) => {
        console.log("Mongo connect error:", e);
        reject();
    });
});