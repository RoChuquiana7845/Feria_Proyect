import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true}
}, {
    versionKey: false
})

const Category = model('Category',CategorySchema);
export default Category;
