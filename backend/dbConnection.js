import mongoose from "mongoose"

import { Schema } from "mongoose"

const todoSchema = new Schema({
    text : {
        type : String,
        required : true
    },
    complete : {
        type : Boolean,
        default : false
    },
    timestamp : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model('Todo', todoSchema)