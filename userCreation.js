import mongoose from "mongoose";
import connect from "core-db";
import prompt from "prompt";
import Users from "root-models/Users";

connect().then(() => {
    const properties = [
        {
            name: "username",
            required: true
        },
        {
            name: "password",
            conform: (pass) => {
                return pass.length >= 8;
            }
        }
    ];

    prompt.get(properties, async (err, result) => {
        if(err) console.log(err);
        else {
            const user = new Users(result);
            await user.save();
            console.log(`User ${result.username} created`);
            mongoose.connection.close();
        }
    });

    prompt.start();
});

