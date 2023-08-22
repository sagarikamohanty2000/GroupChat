
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
               await group.addUser(req.user.id);
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
module.exports = {
    postCreateGroup,
    getAllGroup
}