import Conversation_Model from "../Models/Conversation";

//Conversation part Start

export const Create_conversation = async (req, res) => {
  const { reciverid, senderid } = req.body;

  try {
    const check_ConverstionExist = await Conversation_Model.findOne({
      $and: [
        { Members: { $in: [reciverid] } },
        { Members: { $in: [senderid] } },
      ],
    });

    if (check_ConverstionExist)
      return res
        .status(400)
        .json({ msg: "UserIs Alerady Exist", Success: false });

    const NewConverasion = new Conversation_Model({
      Members: [senderid, reciverid],
    });

    const Conversation = await NewConverasion.save();

    if (!Conversation) return res.send({ msf: "Please Try again" });

    return res.status(200).json({ msg: "Conversation Created", Success: true });
  } catch (error) {
    console.log(error);
  }
};

export const Fetch_All_Conversation = async (req, res) => {
  try {
    //console.log(req.params.id)
    const All_Conversation = await Conversation_Model.find({
      Members: { $in: [req.params.id] },
    });
    if (!All_Conversation)
      return res
        .status(400)
        .json({ msg: "No Conversation Avalible", Success: false });

    return res.status(200).json({ data: All_Conversation, Success: true });
  } catch (error) {
    console.log(error);
  }
};

export const Delete_Conversation = async (req, res) => {
  const { Conversation_id } = req.params;
  console.log(Conversation_id, req.User._id);
  try {
    const check_ConverstionExist = await Conversation_Model.findOne({
      $and: [
        { Members: { $in: [Conversation_id.toString()] } },
        { Members: { $in: [req.User._id.toString()] } },
      ],
    });
    if (!check_ConverstionExist)
      return res
        .status(400)
        .json({ msg: "Conversation Alerady Deleted", Success: false });

    const Delete_Conversation = await Conversation_Model.findByIdAndDelete(
      check_ConverstionExist._id
    );

    if (!Delete_Conversation)
      return res.status(500).json({ msg: "Try AGain", Success: false });

    return res.status(200).json({
      msg: "Conversation Deleted",
      Success: true,
      data: Delete_Conversation,
    });
  } catch (error) {
    console.log(error);
  }
};
