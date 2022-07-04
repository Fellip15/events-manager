const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var morgan = require('morgan')
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// app.use(require("./routes/User")); -> exemplo da monitoria
app.use(require('./routes/User'));
app.use(require('./routes/Events'));

mongoose.connect(process.env.CONN_STR, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

const PORT = 5300;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
});
