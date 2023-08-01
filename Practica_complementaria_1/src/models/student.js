import { model, Schema } from "mongoose";

let collection = 'students'

let schema = new Schema({
    name: { type: String, require: true},
    lastName: { type: String, require: true},
    age: { type: Number, require: true},
    identification: { type: Number, require: true, unique: true},
    course: {type: String, default: 'backend'},
    note: {type: Number, require: true}
})

const Student = model(collection, schema);

export default Student;
