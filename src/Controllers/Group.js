import GroupsModel from "../Models/Groups";
import UserModel from "../Models/User";
import path from "path";
import Conversation_Model from "../Models/Conversation";
export const Create_Group = async (req, res) => {
  const { groupName, gropMembers } = req.body;

  const newGroup = new GroupsModel({
    groupName: groupName,
    Members: gropMembers,
  });

  const savedgroup = await newGroup.save();
  if (savedgroup)
    return res
      .status(200)
      .json({ Success: true, msg: "Group is Created", savedgroup });
};

export const getAllgroups = async (req, res) => {
  const id = req.User._id;

  const Groups = await GroupsModel.find({});
  // Members: { $in: [id] },
  const filterdata = Groups.filter((item) => item.Members.includes(id));

  res.status(200).json({ filterdata });
};

export const LeaveGroup = async (req, res) => {
  const { groupId } = req.params;
  const GroupExist = await GroupsModel.findById(groupId);
  if (!GroupExist)
    return res.status(400).json({ msg: "Group not exist ", Success: false });
  const grouparray = GroupExist.Members;
  const groupfilter = grouparray.filter((item) => item != req.User._id);

  const updateGroup = await GroupsModel.findByIdAndUpdate(
    groupId,
    {
      Members: groupfilter,
    },
    { new: true }
  );

  res.status(200).json({ msg: "updated", Success: true, data: updateGroup });
};

export const addnewingroup = async (req, res) => {
  const { groupId } = req.params;

  const GroupExist = await GroupsModel.findById(groupId);

  if (!GroupExist)
    return res.status(400).json({ msg: "Group not exist ", Success: false });

  if (GroupExist.Members.includes(req.User._id)) {
    return res
      .status(400)
      .json({ msg: "you allready in a group ", Success: false, GroupExist });
  }

  const updateGroup = await GroupsModel.findByIdAndUpdate(
    groupId,
    {
      $push: { Members: req.User._id },
    },
    { new: true }
  );

  if (updateGroup) return res.status(200).json({ Success: true, updateGroup });
};

export const getallusertoadd = async (req, res) => {
  const id = req.User._id;
  try {
    const Users = await UserModel.find();

    const All_Conversation = await Conversation_Model.find({
      Members: { $in: [id.toString()] },
    });

    //console.log(All_Conversation);
    if (!Users) return res.status(400).json({ Success: false });

    return res.status(200).json({ Success: true, Users });
  } catch (error) {
    console.log(error);
  }
};

//Send Message to Group

// export const SendMessageGroup = async (req, res) => {
//   const { SenderId, ReciverGroupId, GroupId, TypeOfMessage, Message_Text } =
//     req.body;
//   console.log(req.body);
//   if (!SenderId || !ReciverGroupId || !GroupId || !TypeOfMessage) {
//     return res
//       .status(500)
//       .json({ msg: "Please Enter All Filed", Success: false });
//   }
//   // Switch stqtemetn to check Type of messages

//   if (TypeOfMessage === "msg") {
//     if (!Message_Text)
//       return res
//         .status(500)
//         .json({ msg: "Please Etner All Filed", Success: false });
//     try {
//       const AddMessage = await GroupsModel.findByIdAndUpdate(
//         GroupId.toString(),
//         {
//           $push: {
//             GroupMessage: {
//               SenderId: SenderId,
//               ReciverGroupId: ReciverGroupId,
//               TypeOfMessage: TypeOfMessage,
//               Message_Text: Message_Text,
//             },
//           },
//         },
//         { new: true }
//       );
//       // Save Message

//       if (!AddMessage)
//         return res
//           .status(500)
//           .json({ msg: "Somthing Want Wrong", Success: false });
//       return res
//         .status(200)
//         .json({ msg: "Msg Sent", Success: true, data: AddMessage });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // type msg is file
//   if (TypeOfMessage === "file") {
//     const extname = path.extname(req.file.filename);
//     //  console.log(typeof (SendrId)) TypeOfMessage: extname,

//     const fileMsg = await GroupsModel.findByIdAndUpdate(
//       GroupId.toString(),
//       {
//         $push: {
//           GroupMessage: {
//             Message_File: req.file.filename,
//             SenderId: SenderId,
//             ReciverGroupId: ReciverGroupId,
//             TypeOfMessage: TypeOfMessage,
//             Message_Text: Message_Text,
//           },
//         },
//       },
//       { new: true }
//     );

//     if (!fileMsg)
//       return res
//         .status(500)
//         .json({ msg: "Somthing Want Wrong", Success: false });
//     return res
//       .status(200)
//       .json({ msg: "File Sent", Success: true, data: fileMsg });
//   }
// };

export const GroupMessageget = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Not Success", Success: false });
  } else {
    try {
      const getchate = await GroupsModel.findById(id);
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

export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const deletedgroup = await GroupsModel.findByIdAndDelete(id);

    if (!deletedgroup) return res.send({ Success: false });
    return res.status(200).json({ Success: true, data: deletedgroup });
  } catch (error) {
    console.log(error);
  }
};
export const getOneGroupDetail = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await GroupsModel.findById(groupId);
    if (!group) return res.send({ Success: false });
    return res.status(200).json({ Success: true, data: group });
  } catch (error) {
    console.log(error);
  }
};
export const SendMessageGroup = async (req, res) => {
  const { SendrId, GroupId, TypeOfMessage, Message_Text } = req.body;
  console.log(req.body);
  if (!SendrId || !TypeOfMessage) {
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
        ReciverGroupId: GroupId,
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
      ReciverGroupId: GroupId,
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
