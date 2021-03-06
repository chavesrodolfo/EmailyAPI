const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passaport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passaport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passaport.initialize());
app.use(passaport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
process.stdout.write('Ready.\n');