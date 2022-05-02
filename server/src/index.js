require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const BookRouter = require('./router/book.routes');
const UserRouter = require('./router/user.routes');
const AuthRouter = require('./router/auth.routes');
const ErrorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(AuthRouter);
app.use(UserRouter);
app.use(BookRouter);
app.use(ErrorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}`);
        await app.listen(process.env.PORT || 7000);

        console.log('server work on port ' + process.env.PORT || 7000);
    } catch (err) {
        console.log(err);
    }
}

start();