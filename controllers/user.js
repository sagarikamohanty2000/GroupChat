
const sequelize = require('../util/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Group = require('../models/group');
const GroupUser = require('../models/group_user');

const postUserSignup = async (req, res, next) =>
{
    const t = await sequelize.transaction();
    const name = req.body.fname;
    const email = req.body.femail;
    const phone = req.body.fph;
    const password = req.body.fpassword;

   const user = await User.findAll({where : {email},})
        if(user.length > 0)
        {
            console.log('USER ALREADY EXISTS');
            res.status(401).json({
                error: {
                    success: "false",
                    message: "User already exists"
                }
            })
        }
        else {
            bcrypt.hash(password,10,async(err, hash) => {
               try{
                await User.create({
                    name : name,
                    email : email,
                    phone : phone,
                    password : hash,
                    transaction: t

                })
                    console.log('USER CREATED');
                    await t.commit();
                    res.status(200).json({
                    success: "true",
                    message : 'Successfully created new user'})
            } 
                    catch(err){
                        await t.rollback();
                        console.log(err)};
                    
                })      
            }
}

function generateAccessToken(id)
{
    console.log(process.env.SECRECT_KEY)
    return jwt.sign({id : id},process.env.SECRET_KEY);
}

const postUserLogin = async(req,res,next) => {

    const email = req.body.femail;
    const password = req.body.fpassword;

    const t = await sequelize.transaction();
    try {
    const user = await User.findAll({where : {email}, });
    if(user.length > 0)
    {
         bcrypt.compare(password , user[0].password ,(err,response) => {
            if(response === true)
            { 
                return  res.status(200).json({
                        success: "true",
                        message:"Successfully logged in",
                        token: generateAccessToken(user[0].id)
                    })
            }

           else if(err) {
                res.status(500). json({
                    success : "false",
                    message : "Something went wrong"
                    })
            }

            else {
                res.status(401). json({
                    success : "false",
                    message : "User not authorised"
                    })
            }
        })
    }

    else {
        res.status(404).json({
            success : "false",
            message : "User not found" 
        })
    }
    }

    catch(err) {
    console.log(err);
    }

}

const getAllUsersGroups = async(req, res, next) => {
    try{
    const users = await Group.findAll({where : {id : req.params.groupId} , include : User});
         res.status(200).json({
            success : "true",
            message : "Users of the Group",
            data : users
         }) 
        }  
         catch(err){
            console.log(err);
         }

}

const updateAdmin = async(req, res, next) => {
   
  try {
        const user = await GroupUser.findAll({where : {userId : req.user.id , isAdmin : true}})
        if(user.length > 0){
        const id = await  GroupUser.findAll({where : {userId : req.body.userId , groupId : req.body.groupId}})
        const response = await id[0].update({isAdmin : true})
        res.status(200).json({
            success: true,
            message: "User is now admin",
            data: response
        })
   }

    else {
        res.status(401).json({
            success: false,
            message: "User not authorised for the action",
        })
    }
   }

  catch(err){
    console.log(err)
  }
}

const removeUser = async (req, res, next) =>{
    const t = await sequelize.transaction();
    try {
        const user = await GroupUser.findAll({where : {userId : req.user.id , isAdmin : true}})
        if(user.length > 0){
            const response = await GroupUser.destroy({where : {userId : req.params.userId , groupId : req.params.groupId}})
            res.status(200).json({
            success: true,
            message: "User is removed",
            data: response
            })
        }

        else {
             res.status(401).json({
            success: false,
            message: "User not authorised for the action",
            })
        }
    }

    catch(err){
       console.log(err)
    }
}

const getAllUsers = async(req,res, next) => {
    
    try{
        console.log("USERS >>>>>>")
        const users = await User.findAll();
        console.log("ALL USERS >>>>>>", users)
             res.status(200).json({
                success : "true",
                message : "All Users",
                data : users
             }) 
            }  
             catch(err){
                console.log(err);
             }
    
}
module.exports = {
    postUserSignup,
    postUserLogin,
    getAllUsersGroups,
    updateAdmin,
    removeUser,
    getAllUsers 
}