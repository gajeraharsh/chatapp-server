import User_Model from "../Models/User";
import Conversation_Model from "../Models/Conversation";
export const Fetch_All_Users = async (req, res) => {
  const { Count } = req.params;
  const limit = 10;
  try {
    const FetchUser = await User_Model.find(
      {},
      { UserName: 1, Email: 1, Profile_Image: 1 }
    ).limit(limit + Count);
    if (!FetchUser)
      return res.status(400).json({ msg: "No Data Avalibele", Success: false });
    var ar = [];
    FetchUser.map((item) => {
      if (
        !item._id.equals(req.User._id) &&
        !req.User.Block.includes(item._id)
      ) {
        ar.push(item);
      }
    });

    res.status(200).json({ data: ar, Success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateproifle = async (req, res) => {
  const { id } = req.params;
  try {
    const update = await User_Model.findByIdAndUpdate(
      id,
      {
        UserName: req.body.UserName,
        Email: req.body.Email,
      },
      { new: true }
    );
    console.log(req.body.Email);

    if (update) return res.status(200).json({ Success: true, data: update });
  } catch (error) {
    console.log(error);
  }
};
export const FetchOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const User = await User_Model.findById(id);
    if (!User)
      return res.status(400).json({ msg: "User No Avalible", Success: false });

    return res.status(200).json({ data: User, Success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getcurrentuser = async (req, res) => {
  const result = await User_Model.findById(req.User._id);

  if (res) return res.status(200).json({ Success: true, data: result });
};

export const Blockuser = async (req, res) => {
  const { id } = req.params;

  const Block = await User_Model.findByIdAndUpdate(
    req.User._id,
    {
      $push: {
        Block: id,
      },
    },
    { new: true }
  );
  const sBlock = await User_Model.findByIdAndUpdate(
    id,
    {
      $push: {
        Block: req.User._id.toString(),
      },
    },
    { new: true }
  );

  const findconversation = await Conversation_Model.findOne({
    Members: { $in: [id] },
  });
  console.log(findconversation != null);
  if (findconversation) {
    const Delete_Conversation = await Conversation_Model.findByIdAndDelete(
      findconversation._id
    );

    return res.status(200).json({ data: Block, Delete_Conversation });
  }

  if (Block) {
    return res.status(200).json({ data: Block });
  } else {
    console.log("not work");
  }
};
