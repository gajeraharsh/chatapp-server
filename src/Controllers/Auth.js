import User_Model from "../Models/User";

export const SignUp = async (req, res) => {
  const { UserName, Email, Password, Cpassword } = req.body;
  if (!UserName || !Email || !Password || !Cpassword) {
    return res
      .status(500)
      .json({ msg: "Please Enter All Field", Success: false });
  }
  if (Password != Cpassword)
    return res.status(500).json({
      msg: "Please Conform password are same as passwrod",
      Success: false,
    });

  const checkuserexist = await User_Model.findOne({ Email: Email });

  if (checkuserexist)
    return res
      .status(500)
      .json({ msg: "Email is alerady exist ", Success: false });

  const Add_User = new User_Model({
    UserName,
    Email,
    Password,
  });

  const User_Save = await Add_User.save({});

  const Token = await User_Save.GetToken();

  const Client_data = {
    _id: User_Save._id,
    UserName: User_Save.UserName,
    Email: User_Save.Email,
    Password: Password,
  };

  if (Token) {
    return res
      .status(200)
      .json({ msg: "SignUp Success", Success: true, data: Client_data, Token });
  }
};

export const SignIn = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Password || !Email) {
    return res
      .status(400)
      .json({ msg: "Please Enter all details", Success: false });
  }
  const checkUserExit = await User_Model.findOne({ Email });

  if (!checkUserExit)
    return res
      .status(400)
      .json({ msg: "Please Signup Then Login", Success: false });
  const CheckPassword = await checkUserExit.CheckPassword(Password);
  if (!CheckPassword)
    return res
      .status(500)
      .json({ msg: "Please Etner Currect Password", Success: false });

  const Token = await checkUserExit.GetToken();
  const Client_Data = {
    _id: checkUserExit._id,
    UserName: checkUserExit.UserName,
    Email: checkUserExit.Email,
    Profile_Image: checkUserExit.Profile_Image,
  };
  if (Token) {
    return res
      .status(200)
      .json({ msg: "Signin Success", Success: true, data: Client_Data, Token });
  }
};
