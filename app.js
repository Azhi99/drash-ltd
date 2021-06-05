const express = require ('express');
require('dotenv').config();

const app = express();

const userRouter = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.user('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Started at port" + process.env.PORT);
});
