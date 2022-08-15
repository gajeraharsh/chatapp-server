import { Router } from "express";
import {
  addnewingroup,
  Create_Group,
  getAllgroups,
  SendMessageGroup,
  getallusertoadd,
  GroupMessageget,
  LeaveGroup,
} from "../Controllers/Group";
import { CheckUserAuth } from "../Middlewares/Auth";
import { UserMessagesend } from "../helper/Multer_Uplode";
const router = Router();

//Start routing

router.post("/Creategroup", CheckUserAuth, Create_Group);
router.get("/getallgroups", CheckUserAuth, getAllgroups);
router.get("/JoinGroup:groupId", CheckUserAuth, addnewingroup);
router.get("/getuserstoaddgroup", CheckUserAuth, getallusertoadd);
router.post(
  "/sendmessage",
  CheckUserAuth,
  UserMessagesend.single("msgFile"),
  SendMessageGroup
);
router.get("/getGroupMessage:id", CheckUserAuth, GroupMessageget);
router.get("/leavegroup:groupId", CheckUserAuth, LeaveGroup);

module.exports = router;
