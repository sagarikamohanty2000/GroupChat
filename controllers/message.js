const sequelize = require('../util/database');

const Message = require('../models/message');
const User = require('../models/user');
const Group = require('../models/group');

const postSentMessage = async (req, res, next) =>
{
    const t = await sequelize.transaction();
    const msg = req.body.msg;
    const groupId = req.body.groupId;
    const userId = req.user.id;
    try {
                await Message.create({
                    msg : msg,
                    userId : userId,
                    groupId : groupId,
                    transaction: t

                })
                    console.log('Message Sent');
                    await t.commit();
                    res.status(200).json({
                    success: "true",
                    message : 'Successfully message sent'})
            } 
                    catch(err){
                        await t.rollback();
                        console.log(err)};
                    
}

const getUserMessage = async (req, res, next) => {

try{
const messages = await Message.findAll({where : {groupId : req.params.groupId}});
const users = await Group.findAll({where: {id: req.params.groupId},include : User});
return res.status(200).json({
    success: true,
    message:'MESSAGE',
    msg : messages,
    user : users,
    currentUser : req.user.id

})

}
catch(err){
    console.log(err);
}
}

module.exports = {
    postSentMessage,
    getUserMessage
}