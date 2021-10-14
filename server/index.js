const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const md5 = require('md5');
const { AbortError, AggregateError, ReplyError } = require("redis");

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
// Strings

// client.set('framework', 'ReactJS', function (err, reply) {
//     console.log(reply); // OK
// });

// client.get('framework', function (err, reply) {
//     console.log(reply); // ReactJS
// });

// // Hashes

// client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

// client.hgetall('frameworks_hash', function (err, object) {
//     console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
// });
// client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function (err, reply) {
//     console.log(reply); // 2
// });

// client.lrange('frameworks_list', 0, -1, function (err, reply) {
//     console.log(reply); // [ 'ReactJS', 'Angular' ]
// });

// client.exists('framework', function (err, reply) {
//     if (reply === 1) {
//         console.log('Exists!');
//     } else {
//         console.log('Doesn\'t exist!');
//     }
// });

// client.del('frameworks_list', function (err, reply) {
//     console.log(reply); // 1
// });
// client.set('status', 'logged_in');
// client.expire('status', 300);