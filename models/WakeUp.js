const express = require('express');
const app = express();
module.exports = class WakeUp {
    wait () {
        app.get('/', function (req, res) {
            res.send('good morning ...');
        });
        app.listen(3000, function () {
        });
    }
}