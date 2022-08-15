import { Router } from "express";
import {
  Create_conversation,
  Delete_Conversation,
  Fetch_All_Conversation,
} from "../Controllers/Conversation";
import { UserMessagesend } from "../helper/Multer_Uplode";
import { SendMessage, GetMessages, MessagesGet } from "../Controllers/Messages";
import { CheckUserAuth } from "../Middlewares/Auth";
const router = Router();

//Start routing

router.post("/Create", CheckUserAuth, Create_conversation);
router.get("/All_Conversaiton:id", CheckUserAuth, Fetch_All_Conversation);
router.get(
  "/removeconversation:Conversation_id",
  CheckUserAuth,
  Delete_Conversation
);
//messages routing
router.post(
  "/sendmessage",
  CheckUserAuth,
  UserMessagesend.single("msgFile"),
  SendMessage
);
//router.post("/getmessages",CheckUserAuth,GetMessages);
router.get("/Messagesget:id", MessagesGet);
module.exports = router;
