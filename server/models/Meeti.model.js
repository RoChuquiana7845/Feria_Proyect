import { Schema, model } from "mongoose";
import slug from "slug";
import { nanoid } from 'nanoid';

const MeetiSchema = new Schema({
    title: {type: String, require: true, unique: true},
    slug: {type: String, default: `${slug(title)}-${nanoid()}`},
    guest: {type: String, require: true, unique: true},
    quota: {type: String, default: 0},
    description:{ type :String, require: true, unique:true },
    date: {type: Date, require: true},
    time: {type: String, require: true, trim: true},
    address: {type: String, require: true},
    city: {type: Schema.Types.ObjectId, ref:'City'},
    state: {type: String, require:true},
    location: {type: String, require: true},
    coordinates: {type: Number, require: true},
    interested: {type: Array, default: []},
    created_at: {type: Schema.Types.ObjectId, ref:'User'},
    group: {type: Schema.Types.ObjectId, ref:'Group'}
}, {
    versionKey: false
})

const Meeti = model('Meeti', MeetiSchema);
export default Meeti;
