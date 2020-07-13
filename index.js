const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
const Mikio = require('./models/Bot');
const mikio = new Mikio();
const WakeUp = require('./models/WakeUp');
const wakeUp = new WakeUp();

wakeUp.wait();
client.on('ready', () => {
    console.log('ready...');
});
client.on('message', message =>{
    mikio.receive(message);
    return;
});
client.login(token);
