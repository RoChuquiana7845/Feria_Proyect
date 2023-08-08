import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    comment: {type: String, require: true},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    meeti: {type: Schema.Types.ObjectId, ref: 'Meeti'}
}, {
    versionKey: false
})

const Comment = model('Comment', CommentSchema);

export default Comment;
