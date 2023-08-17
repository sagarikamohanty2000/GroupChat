
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const sequelize = require('./util/database');


const app = express();

const userRoutes = require('./routes/users');


app.use(cors());
app.use(bodyParser.json({extended : false}));
app.use(userRoutes);


sequelize.sync()
.then(result => {
app.listen(3000);
})
.catch(err => console.log(err));