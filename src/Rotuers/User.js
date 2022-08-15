import { Router } from "express";
import {
  Fetch_All_Users,
  FetchOneUser,
  getcurrentuser,
  Blockuser,
  updateproifle,
} from "../Controllers/User";
import { User_Profile_Uplode } from "../Helper/Multer_Uplode";
import { CheckUserAuth } from "../Middlewares/Auth";
import User_Model from "../Models/User";
const router = Router();
router.get("/FetchUser:count", CheckUserAuth, Fetch_All_Users);
router.get("/FetchOneUser:id", CheckUserAuth, FetchOneUser);
router.get("/getcurrentuser", CheckUserAuth, getcurrentuser);
router.get("/blockuser:id", CheckUserAuth, Blockuser);
router.post("/updateprofile:id", CheckUserAuth, updateproifle);
router.post(
  "/UserProfileUplode",
  CheckUserAuth,
  User_Profile_Uplode.single("profileImage"),
  async (req, res) => {
    const fileName = req.file.filename;
    console.log(fileName);
    const { id } = req.body;
    const UplodeImage = await User_Model.findByIdAndUpdate(
      id,
      {
        Profile_Image: fileName,
      },
      {
        new: true,
      }
    );

    if (!UplodeImage)
      return res.status(500).json({
        msg: "Try Again",
        Success: false,
      });

    return res
      .status(200)
      .json({ msg: "Image Uploded", Success: true, data: UplodeImage });
  }
);
module.exports = router;
