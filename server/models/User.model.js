import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {type: String, require: true},
    image: {type: String, require: true},
    description: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true, unique: true},
    active: {type: Number, default: 0}
})

const User = model('User', UserSchema);
export default User;