import mongoose from "mongoose";

//Create Schema

const Groups_schema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      requried: true,
    },
    Members: {
      type: Array,
      required: true,
    },
    GroupMessage: [
      {
        SenderId: {
          type: String,
          required: true,
        },
        ReciverGroupId: {
          type: String,
          required: true,
        },
        TypeOfMessage: {
          type: String,
          required: true,
        },
        Message_Text: {
          type: String,
        },
        Message_File: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

//Create Model

const Group_Model = new mongoose.model("Group", Groups_schema);

// Export converstion

module.exports = Group_Model;
