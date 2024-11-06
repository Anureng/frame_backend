import mongoose, { Schema, Document } from "mongoose";

interface IComments extends Document {
    name: string,
    discription: string,
}

const comments: Schema<IComments> = new mongoose.Schema({
    name: String,
    discription: String,
})

const commentModel = mongoose.model<IComments>("CommentModel", comments)
export default commentModel