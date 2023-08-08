import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
    name: {type: String, require: true, unique: true},
    description:{ type :String, require: true, unique: true },
    url: {type:String, require: true, unique: true},
    imagen: {type: String, require: true, unique: true},
    category: {type:Schema.Types.ObjectId, ref:'Category', require: true},
    user: {type: Schema.Types.ObjectId, ref:'User', require: true}
});

const Group = model('Group', GroupSchema);
export default Group;
