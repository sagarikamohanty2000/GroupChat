const sequelize = require('../util/database');
const s3Services = require('aws-sdk');
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

const postSentFile = async(req, res, next) => {

    try{
    const fileContent = Buffer.from(req.body.fileData);
    const fileName = `${req.user.id}/${req.body.fileData}`;
    const fileUrl = await s3Services.uploadToS3(fileContent,fileName);
                await File.create({
                    fileUrl: fileUrl,
                    userId: userId
                })
                res.status(200).json({
                    fileUrl, 
                    success : true,
                    message : "File download successful"
                })
            
    }
    catch(err){
      console.log(err);
    }
}

const getUserMessage = async (req, res, next) => {

try{
const messages = await Message.findAll({where : {groupId : req.params.groupId}//, 
    // order:[['id','DESC']],
     //limit: 9,
});
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
    postSentFile,
    getUserMessage
}