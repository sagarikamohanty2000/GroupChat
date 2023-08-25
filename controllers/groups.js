
const sequelize = require('../util/database');
const Group = require('../models/group');
const User = require('../models/user');
const GroupUser = require('../models/group_user');


const postCreateGroup = async (req, res, next) => {
  
    const t = await sequelize.transaction();
    const name = req.body.groupName;
    try {
          const group = await Group.create({
                groupName : name,
                transaction: t
                })
               await group.addUser(req.user.id, { through: { isAdmin: true } });
                console.log('Group Created');
                await t.commit();
                res.status(200).json({
                success: "true",
                message : 'Successfully group created'})
        } 

    catch(err)
            {
                await t.rollback();
                console.log(err)
            }
}

const getAllGroup = async (req, res, next) =>{

    try{
    const groups = await User.findAll({where : {id: req.user.id}, include : Group});
    res.status(200).json({
        sucess: "true",
        data : groups
    })
    }

    catch(err) {
        console.log(err);
    }
}

const adduserGroup = async (req, res, next) => {
    try {
        const isAdmin = await GroupUser.findAll({where : {userId : req.user.id, groupId : req.body.groupId, isAdmin : true}});
        
        if(isAdmin.length > 0){
            const user = await GroupUser.findAll({where: {userId : req.body.userId, groupId : req.body.groupId}})
            if(user.length === 0 ){
            const group = await Group.findAll({where : {id : req.body.groupId}})
            await group[0].addUser(req.body.userId, {through: {isAdmin: false}});
                res.status(200).json({
                success: "true",
                message : 'Successfully user added to the group'})
            }
            else {
                res.status(400).json({
                    success: "false",
                    message : 'User is already part of the group'})

            }
        }
        else {
            res.status(401).json({
                success: "false",
                message : 'User doesnot have Admin authorities'})
        }
    }
    catch(err){
        console.log(err);
    }

}
module.exports = {
    postCreateGroup,
    getAllGroup,
    adduserGroup
}