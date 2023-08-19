
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const sequelize = require('./util/database');


const app = express();

const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');

const User = require('./models/users');
const Message = require('./models/message');

app.use(cors());
app.use(bodyParser.json({extended : false}));
app.use(userRoutes);
app.use(messageRoutes);

User.hasMany(Message);
Message.belongsTo(User,{constraints:true, onDelete : 'CASCADE'});

sequelize.sync()
.then(result => {
app.listen(3000);
})
.catch(err => console.log(err));