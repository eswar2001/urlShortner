const redis = require('redis');
const md5 = require('md5');
const { AbortError, AggregateError, ReplyError } = require("redis");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dateTime = require('util')
const app = express();
const router = express.Router();
//linking bodyparser
app.use(express.json());
//linking cors
app.use(cors());
//linking express router
app.use(router);
//connection with redis
const client = redis.createClient(6379, '127.0.0.1');
//synchronization counter
let counter = 0;
//redis connection stats
client.on('connect', function () {
    console.log('Connected!');
});
client.on("error", function (err) {
    assert(err instanceof Error);
    assert(err instanceof AbortError);
    assert(err instanceof AggregateError);

    // The set and get are aggregated in here
    assert.strictEqual(err.errors.length, 2);
    assert.strictEqual(err.code, "NR_CLOSED");
});
//server routes
app.get('/', (req, res) => {
    res.status(200).send('Hi! there');
});
app.get('/:string/:string/', (req, res) => {
    console.log(req.hostname);
    let shortUrl = req.path.slice(1, req.path.length);
    client.exists(shortUrl, function (err, reply) {
        if (reply === 1) {
            client.HGETALL(shortUrl, function (err, object) {
                res.status(400).redirect(object.longUrl);
            });
        } else {
            res.status(400).redirect(`http://${req.hostname}/404`);
        }
    });
});
app.post('/create', (req, res) => {
    try {
        let longUrl = req.body['longUrl'];
        let month = new Date().getMonth();
        let day = new Date().getUTCDate();
        let year = new Date().getUTCFullYear();
        let present = new Date();
        present = present.toISOString();
        let computedUrl = md5(`${present}:${longUrl}`);
        let shortUrl = day.toString() + month.toString() + year.toString() + '/' + computedUrl.slice(0, 6);
        client.exists(shortUrl, function (err, reply) {
            if (reply === 1) {
                client.HGETALL(shortUrl, function (err, object) {
                    if (longUrl == object.longUrl) {
                        res.status(200).json(object);
                    }
                    else {
                        shortUrl = day.toString() + month.toString() + year.toString() + '/' + computedUrl.slice(0, 6) + '/' + counter.toString();
                        counter += 1;
                        client.HMSET(shortUrl, 'longUrl', longUrl, 'computedUrl', computedUrl, 'shortUrl', shortUrl, 'timestamp', present);
                        res.status(200).json({ shortUrl, longUrl, computedUrl });
                    }
                });
            } else {
                client.HMSET(shortUrl, 'longUrl', longUrl, 'computedUrl', computedUrl, 'shortUrl', shortUrl, 'timestamp', present);
                client.EXPIRE(shortUrl, 1296000);
                res.status(200).json({ shortUrl, longUrl, computedUrl });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.post('/delete', (req, res) => {
    try {
        let shortUrl = req.body['shortUrl'];
        client.exists(shortUrl, function (err, reply) {
            if (reply == 1) {
                client.del(shortUrl, function (err, response) {
                    if (response == 1) {

                        res.status(200).json({ 'message': 'Deleted Successfully!' });
                        console.log("Deleted Successfully!");
                    } else {
                        res.status(200).json({ 'message': 'cannot delete' });
                    }
                });
            } else {
                res.status(200).json({ 'message': 'Short URL dosen\'t exist' });
            }
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

//server port
const PORT = process.env.PORT || 8000;
//server listing to [PORT]
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
});