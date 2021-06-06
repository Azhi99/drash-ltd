const express = require ('express');
require('dotenv').config();

const app = express();

// const userRouter = require('./routes/user');
const emailRouter = require('./routes/emails.js')
const contactRouter = require('./routes/contactUs')
const aboutRouter = require('./routes/about.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.user('/user', userRouter);
app.use('/emails', emailRouter)
app.use('/contactUs', contactRouter)
app.use('/aboutUs', aboutRouter)

app.listen(process.env.PORT, () => {
    console.log("Server Started at port" + process.env.PORT);
});
