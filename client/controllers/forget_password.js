const path = require('path');
const nodemailer = require("nodemailer");
const {v4: uuid} = require('uuid');
const sequelize = require('../util/database');
const bcrypt = require('bcryptjs');
const FP = require('../models/forget_password');
const User = require('../models/user');

const forgotPwdEmail = async (req,res,next) => {

    const t = await sequelize.transaction();
    const email = req.body.femail;
    const uniqueId =  uuid();
         User.findOne({where: {email : email}}).then((user) => {
            
      
        FP.create({
            uuid:uniqueId,
            isActive: true,
            userId: user.id,
            transaction: t
        },)
         })


    const transporter = nodemailer.createTransport({
        host: process.env.ETHEREAL_URL,
        port: process.env.ETHEREAL_PORT,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS
        }
    });
      
        const info = await transporter.sendMail({
        from: '"Sagarika" <foo@example.com>', 
        to: req.body.femail, 
        subject: 'Reset Password Link',
        textContent:"",
        text: "", 
        html: `<p>Click on the link to reset your password</p>
         <a href="http://localhost:3000/password/resetpassword/${uniqueId}">Reset Password</a>
        `
      });
      console.log('Email SENT >>>>>>>>>>>')
      return res.send(info.messageId);
    }
    

const resetPassword = async (req,res,next) => {

        try {
        const forgetPwdId = req.params.uniqueId;
        FP.findOne({where : {uuid: forgetPwdId}}).then((request) =>{
            if(request.isActive === true)
            {
                FP.update({isActive: false}, {where: {uuid: forgetPwdId}})
                .then((result)=>{ 
                res.send(`<html>
                               <script>
                                  function myFunction(event){
                                    e.prevenyDefault();
                                    console.log('called')
                                    window.location.href="../view/login.html"
                                  }
                                  </script>
                                  <body>
                                  <header id="mainHeader" class="bg-info text-black p-3 mb-3">
                                        <div class="container">
                                            <div class="row">
                                                <h2 id="headerTitle">Reset Password Page</h2>
                                            </div>
                                        </div>
                                   </header>
                                   <div class="container">
                                      <div class="box">
                                        <form action="/password/updateNewPassword/${forgetPwdId}" onsubmit="myFunction(event)" method="get">
                                        <label for="fpassword">Enter new Password</label>
                                        <input name="fpassword" type="password" required></input>
                                        <button>Reset Password</button>
                                        </form>
                                  </div>
                                  </div>
                                  </body>
                                  </html>
                                  `);

                                   res.end()
                                })
            }
            else{
                res.status(403).json({
                    error: {
                        message:"The link has expired"
                    }
                })
            }
        } )
        }

        catch(err){
        console.log(err)
        }
    }

const updateNewPassword = async(req,res,next) => {
       
    const t = await sequelize.transaction();
            try {
                const newpassword = req.query.fpassword;
                const  uniqueId = req.params.uniqueId;
         
               await FP.findOne({ where : { uuid: uniqueId }}).then(resetpassword => {
               
                    User.findOne({where: { id : resetpassword.userId}}).then(async (user) => {
                        if(user){
                            const saltRounds = 10;
                        bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({
                                    success: true,
                                    message: 'Successfuly update the new password'})
                            })
                        });
                        }
                        })
                    })       
            }
            catch(err)
            {
                await t.rollback();
                console.log(err);
            }
    }
module.exports = {
    forgotPwdEmail,
    resetPassword,
    updateNewPassword
}