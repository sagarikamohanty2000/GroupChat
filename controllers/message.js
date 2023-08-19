const sequelize = require('../util/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Message = require('../models/message');

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


module.exports = {
    postSentMessage
}