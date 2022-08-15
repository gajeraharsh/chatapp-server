import multer from "multer";
import path from "path"

const User_Profile_Uplode_Destination = multer.diskStorage({
    destination:"uplodes/images/",
    filename:function(req,file,cb) {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

export const User_Profile_Uplode = multer({
    storage:User_Profile_Uplode_Destination,
})


const User_Message_Send = multer.diskStorage({
    destination:"uplodes/Files/",
    filename:function(req,file,cb) {
        cb(null,Date.now() + path.extname(file.originalname))
    }
});

export const UserMessagesend = multer({
    storage:User_Message_Send,
})
