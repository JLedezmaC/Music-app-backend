require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user.route')
const favoriteRoute = require('./routes/favorite.route');
const recentRoute = require('./routes/recent.route');
const playlistRoute = require('./routes/playlist.route');

const app = express();

const HOSTNAME = process.env.HOSTNAME || 'localHost'
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connection to db established'))

app.use(express.json());
app.use(express.urlencoded({
    type: 'application/x-www-form-urlencoded',
    extended: true,
}))
app.use(cors());
app.use('/', userRoute);
app.use('/', favoriteRoute);
app.use('/', recentRoute);
app.use('/', playlistRoute);

app.use('*', (res, req) => {
    res.status(404)
    res.send('Path cannot found')
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`server running on ${HOSTNAME}:${PORT}`)
})
