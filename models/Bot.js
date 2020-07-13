const OpggLol = require('./Opgg');
const opggLoL = new OpggLol();

module.exports = class Bot {

    async receive(message) {
        if(!this.doMention(message)) {
            return;
        }

        await this.opgg(message);
    }

    async opgg (message) {
        const messageArray = message.content.split(' ');
        const championName = messageArray[1];
        const url = await opggLoL.champion(championName);
        if(championName !== undefined) {
            message.reply(url).then(() => console.log("Sent message: ", url));
        } else {
            const replyText = "チャンピオン名を入れてくれ\nexample) @opgg アッシュ";
            message.reply(replyText).then(() => console.log("Sent message: ", replyText));
        }
    }

    doMention(message) {
        console.log("message.author.bot: ", message.author.bot);
        if (message.author.bot) {
            return false;
        }
        const userMap = message.mentions.users;
        const roleMap = message.mentions.roles;
        let flag = false;

        roleMap.forEach(role => {
            if (role.name === 'opgg') {
                flag = true;
            }
        });

        userMap.forEach(user => {
            if (user.username === 'opgg') {
                flag = true;
            }
        });

        return flag;
    }
};
