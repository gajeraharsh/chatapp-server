import jwt from "jsonwebtoken"
import User_Model from "../Models/User"

export const CheckUserAuth = async (req,res,next) => {
    if(!req.headers.authorization && !req.headers.authorization.startsWith("Bearer")){
        res.status(500).json({msg:"You no Authorize",Success:false})
    }

    const token = req.headers.authorization.split(" ")[1];

    if(!token) return res.status(500).json({msg:"Uou not authorize",Success:false})

    try {
        const Decode_Token = jwt.verify(token,process.env.SECERAT);
     
        const user = await User_Model.findById(Decode_Token._id);
       
        if(!user){
            return  res.status(500).json({msg:"Uou not authorize",Success:false});
        }

        req.User = user;
        next()
    } catch (error) {
        res.status(500).json({msg:"You not Authorize",Success:false})
        
    }
   


}