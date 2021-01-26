
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// create express server
const app = express();
const port = process.env.PORT || 5000;

//parse json
app.use(cors());
app.use(express.json());

// datatbase uri = from mongodb atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//start the server - terminal "nodemon server"
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});