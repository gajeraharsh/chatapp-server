import mongoose from "mongoose";


//Create Schema 

const Conversation_Schema = new mongoose.Schema({
    Members:{
        type:Array,
    }
},{timestamps:true});


//Create Model

const Conversation_Model = new mongoose.model("Conversations",Conversation_Schema);

// Export converstion

module.exports = Conversation_Model;

