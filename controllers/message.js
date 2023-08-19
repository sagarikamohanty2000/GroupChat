const sequelize = require('../util/database');

const Message = require('../models/message');
const User = require('../models/users');

const postSentMessage = async (req, res, next) =>
{
    const t = await sequelize.transaction();
    const msg = req.body.msg;
    const userId = req.user.id;
    try {
                await Message.create({
                    msg : msg,
                    userId : userId,
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
const messages = await Message.findAll({where : {userId : req.user.id}});
return res.status(200).json({
    success: true,
    message:'MESSAGE',
    msg : messages
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