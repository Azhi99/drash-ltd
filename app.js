const express = require ('express');
require('dotenv').config();

const app = express();

const userRouter = require('./routes/user');
const certificateRouter = require('./routes/certificate');
const serviceRouter = require('./routes/service');
const emailRouter = require('./routes/emails.js')
const contactRouter = require('./routes/contactUs')
const aboutRouter = require('./routes/about.js')

const dashboardRouter = require('./routes/dashboard');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/certificates', certificateRouter);
app.use('/services', serviceRouter);
app.use('/emails', emailRouter)
app.use('/contactUs', contactRouter)
app.use('/aboutUs', aboutRouter)
app.use('/dashboard', dashboardRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Started at port " + process.env.PORT);
});
