const pushRouter = require('express').Router();
const q = require('q');
const webPush = require('web-push');
require('dotenv').config();
const User = require('../models/user');
const getUser = require('../services/userService');

pushRouter.post('/', (req, res) => {
    const content = {...req.body};

    User.find({}, (err, subsc) => {
        if (err) {
            res.send(500);
        } else {
            let subscrCalls = subsc.map((sub) => {
                return new Promise((resolve, reject) => {
                    const pushSubscription = {
                        endpoint: sub.endpoint,
                        keys: {
                            p256dh: sub.keys.p256dh,
                            auth: sub.keys.auth
                        }
                    }
                    const pushContent = JSON.stringify(content);
                    const opt = {
                        vapidDetails: {
                            subject: 'http://example.com',
                            privateKey: process.env.PRIVATE_KEY,
                            publicKey: process.env.PUBLIC_KEY
                        },
                        TTL: content.ttl,
                        headers: {}
                    };

                    webPush.sendNotification(
                        pushSubscription,
                        pushContent,
                        opt
                    ).then(v => {
                        resolve({
                            status: true,
                            endpoint: sub.endpoint,
                            data: v
                        });
                    }).catch(e => {
                        reject({
                            status: false,
                            endpoint: sub.endpoint,
                            data: e
                        });
                    });
                });
            });
            q.allSettled(subscrCalls).then((result) => {
                console.log(result);
            });
            res.json({ data: 'Push triggered' });
        }
    });
});

pushRouter.post('/subscribe', async (req, res, next) => {
    const usr = await getUser(req, res, next);
    usr.endpoint = req.endpoint;
    usr.keys = req.keys;
    const resp = await usr.save();
    res.send(resp.toJSON());
});

module.exports = pushRouter;