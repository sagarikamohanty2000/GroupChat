
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const sequelize = require('./util/database');


const app = express();
const path = require('path');

const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/groups');
const forget_passwordRoutes = require('./routes/forget_password');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupUser = require('./models/group_user');
const ForgetPwd = require('./models/forget_password')

app.use(cors());
app.use(bodyParser.json({extended : false}));
app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);
app.use(forget_passwordRoutes);

app.use((req,res) => {
  res.sendFile(path.join(__dirname,`${req.url}`));  
});

User.hasMany(ForgetPwd);
ForgetPwd.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

User.hasMany(Message);
Message.belongsTo(User,{constraints:true, onDelete : 'CASCADE'});

Message.belongsTo(Group,{constraints:true, onDelete : 'CASCADE'});
Group.hasMany(Message);

User.belongsToMany(Group,{through : GroupUser});
Group.belongsToMany(User,{through : GroupUser});

sequelize.sync()
.then(result => {
app.listen(3000);
})
.catch(err => console.log(err));