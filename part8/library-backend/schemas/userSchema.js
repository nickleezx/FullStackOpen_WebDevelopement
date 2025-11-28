import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    favoriteGenre: {
        type: String,
    },
});

schema.plugin(uniqueValidator);

export default model("User", schema);
