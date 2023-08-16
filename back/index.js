const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const connectDatabase=require('./src/database/database')
const app = express();
app.use(express.json());
app.use(cors());

connectDatabase()
requireDir('./src/models')

app.use('/TCC', require('./src/routes/routes'));
app.listen(3001);
