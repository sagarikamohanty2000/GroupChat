
const sequelize = require('../util/database');
const bcrypt = require('bcryptjs');

const User = require('../models/Users');

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

function tokengenerate(id)
{
    console.log(process.env.SECRECT_KEY)
    return jwt.sign({id:id},process.env.SECRET_KEY);
}

const postUserLogin = async(req,res,next) => {

    const email = req.body.femail;
    const password = req.body.fpassword;

    const t = await sequelize.transaction();
    try {
    const user = await User.findAll({where : email });
    if(user.length > 0)
    {
        bcrypt.compare(password , user[0].password ,(err,response) => {
        
            if(response === true)
            {
                bcrypt.hash(user[0].id,10,async (err,hash) => {
                    return res.status(200).json({
                        success: "true",
                        message:"Successfully logged in",
                        token: generateAccessToken(hash)
                    })
                })
            }

            if(err) {
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

module.exports = {
    postUserSignup,
    postUserLogin
}