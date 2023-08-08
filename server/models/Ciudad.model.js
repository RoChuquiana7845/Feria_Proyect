import { Schema, model } from "mongoose";

const CitySchema = Schema({
    name: {type: String, require: true, unique: true},
    country: {type: Schema.Types.ObjectId, ref: 'Country'}
})

const City = model('City', CitySchema);

export default City; 
