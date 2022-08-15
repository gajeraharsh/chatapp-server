import mongoose from "mongoose";

//Create  schema

const Messages_Schema = new mongoose.Schema(
  {
    SendrId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    ReciverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    ConversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Conversations",
    },
    Message_Text: {
      type: String,
    },
    Message_File: {
      type: String,
    },
    TypeOfMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Messages_Model = new mongoose.model("Messages", Messages_Schema);
module.exports = Messages_Model;
