// Socket Controoler

let  Users = [];


 const AddUser = (UserId,Socketid) => {
    if(UserId != null){
        !Users.some((item) => item.UserId === UserId) &&
            Users.push({UserId,Socketid})
    }
 
   // console.log(Users)
}

 const RemoveUser = (Socketid) => {
        Users = Users.filter((item) => item.Socketid !== Socketid)
}


 const GetUser = (ReciverId) => {
    return Users.find((item) => item.UserId === ReciverId);
};


export {GetUser,AddUser,RemoveUser}