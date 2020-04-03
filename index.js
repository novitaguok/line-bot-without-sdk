// const Bluebird = require('bluebird');
// const crypto = require('crypto');
// const request = require('request-promise');
var linebot = require('linebot');
var express = require('express');
const app = express();

const followEventProcessor = require('./event-processors/follow');
const invalidEventProcessor = require('./event-processors/invalid');
const joinEventProcessor = require('./event-processors/join');
const leaveEventProcessor = require('./event-processors/leave');
const messageEventProcessor = require('./event-processors/message');
const unfollowEventProcessor = require('./event-processors/unfollow');

var bot = linebot({
    channelId: 'Ufe47177397de6d3401d5844c22d90d57',
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
})

let baseURL = 'https://line-bot-without-sdk.herokuapp.com/';

bot.on('message', function(event) {
    if (event.message.type == 'text') {
        var msg = event.message.text;
        event.reply(msg).then(function(data) {
            console.log(msg);
        }).catch(function(error) {
            console.log(error);
        });
    }
});

const linebotParser = bot.parser();

app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log('Running on port ' + port);
})

const MAX_CONCURRENCY = 10;

// const REPLY = {
//     URL: 'https://api.line.me/v2/bot/message/reply',
//     TIMEOUT: 60000, // 60 seconds
// };

// const processEventByType = (event) => {
//     switch (event.type) {
//         case 'follow':
//             return followEventProcessor(event);

//         case 'join':
//             return joinEventProcessor(event);

//         case 'leave':
//             return leaveEventProcessor(event);

//         case 'message':
//             return messageEventProcessor(event);

//         case 'unfollow':
//             return unfollowEventProcessor(event);

//         default:
//             return invalidEventProcessor();
//     }
// };

// const processEvent = event => processEventByType(event)
//     .catch((err) => {
//         console.error(err);

//         // In case something error on our side,
//         // we should tell the user that we're unable to process the request
//         const messages = [{
//             type: 'text',
//             text: 'Something error',
//         }];

//         return messages;
//     })
//     .then((messages) => {
//         // Some events don't have replyToken
//         if (!event.replyToken) {
//             return Bluebird.resolve();
//         }

//         const requestBody = {
//             replyToken: event.replyToken,
//             messages,
//         };

//         const requestOptions = {
//             uri: REPLY.URL,
//             method: 'POST',
//             timeout: REPLY.TIMEOUT,
//             headers: {
//                 Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),
//             resolveWithFullResponse: true,
//         };

//         return request(requestOptions)
//         .then((response) => {
//             if(response.statusCode = 200) {
//                 console.log('Reply sent successfully');
//             } else {
//                 console.log(`Error sending reply to LINE server with status ${response.statusCode}:\n ${response.body}`);
//             }
//         });
//     })
//     .catch((err) => {
//         // Error sending HTTP request
//         console.error(err);
//     });

// const processWebhookEvents = events => Bluebird.map(events, event => processWebhookEvents(event), { concurrency: MAX_CONCURRENCY });

// module.exports = (req, res) => {
//     try {
//         const text = JSON.stringify(req.body);
//         // const hmac = crypto.createHmac('SHA256', process.env.LINE_CHANNEL_SECRET).update(text).digest('raw');
//         // const signature = Buffer.from(hmac).toString('base64');
//         const signature = crypto
//             .createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
//             .update(text).digest('base64').toString();

//         if (signature !== req.headers['x-line-signature']) {
//             return res.status(401).send('Unauthorized');
//         }

//         return processWebhookEvents(req.body.events)
//         .then(() => res.status(200).send('OK'));
//     } catch (err) {
//         console.error(err);

//         return res.status(500).send('Error');
//     }
// };