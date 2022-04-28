const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const BookRouter = require('./src/router/book-routes');
const AdminRouter = require('./src/router/admin-routes');
const Error = require('./src/middleware/error-middleware');

const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());

app.use('/uploads', express.static(__dirname +'/uploads'));

app.use(BookRouter);
app.use(AdminRouter);
app.use(Error);

const start = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}`)
        app.listen(process.env.PORT, () => console.log('server work on port ' + process.env.PORT || 7000))
    } catch (err) {
        console.log(err)
    }
}

start()