import Messages_Model from "../Models/Messages";
import path from "path";

export const SendMessage = async (req, res) => {
  const { SendrId, ReciverId, ConversationId, TypeOfMessage, Message_Text } =
    req.body;

  if (!SendrId || !ReciverId || !ConversationId || !TypeOfMessage) {
    return res
      .status(500)
      .json({ msg: "Please Etner All Filed", Success: false });
  }
  // Switch stqtemetn to check Type of messages

  if (TypeOfMessage === "msg") {
    if (!Message_Text)
      return res
        .status(500)
        .json({ msg: "Please Etner All Filed", Success: false });
    try {
      const AddMessage = new Messages_Model({
        SendrId: SendrId,
        ReciverId: ReciverId,
        ConversationId: ConversationId,
        TypeOfMessage: TypeOfMessage,
        Message_Text: Message_Text,
      });

      // Save Message

      const SaveMessage = await AddMessage.save();
      if (!SaveMessage)
        return res
          .status(500)
          .json({ msg: "Somthing Want Wrong", Success: false });
      return res
        .status(200)
        .json({ msg: "Msg Sent", Success: true, data: SaveMessage });
    } catch (error) {
      console.log(error);
    }
  }
  // type msg is file
  if (TypeOfMessage === "file") {
    const extname = path.extname(req.file.filename);
    //  console.log(typeof (SendrId))

    const fileMsg = new Messages_Model({
      SendrId: SendrId,
      ReciverId: ReciverId,
      ConversationId: ConversationId,
      TypeOfMessage: extname,
      Message_File: req.file.filename,
    });

    //save send File

    const SaveFile = await fileMsg.save();

    if (!SaveFile)
      return res
        .status(500)
        .json({ msg: "Somthing Want Wrong", Success: false });
    return res
      .status(200)
      .json({ msg: "File Sent", Success: true, data: SaveFile });
  }
};

// export const GetMessages = async (req,res) => {
//         const {id} = req.body;

//         try {
//             const getchate = await Messages_Model.find({ConversationId:id});
//             if(!getchate) return res.status(500).json({msg:"Please Try Again",Success:false})

//             return res.status(200).json({data:getchate})
//         } catch (error) {
//             console.log(error)
//         }
// }

export const MessagesGet = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Not Success", Success: false });
  } else {
    try {
      const getchate = await Messages_Model.find({ ConversationId: id });
      if (!getchate)
        return res
          .status(500)
          .json({ msg: "Please Try Again", Success: false });
      //console.log(getchate)
      return res.status(200).json({ data: getchate });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Paramiter Error", Success: false, error: error });
    }
  }
};
