const request = require('request');
const version = "9.3.1";
module.exports =
    class Opgg {
    async convertChampNameFromJpToEnglish(JpName) {
        let champion = {};
        const option = {
            url: 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/ja_JP/champion.json',
            method: 'GET',
            json: true
        };
        const body = await this.doRequest(option);

        for (const [key, championElement] of Object.entries(body.data)) {
            if(championElement.name.indexOf(JpName) !== -1) {
                champion = championElement;
            }
        }

        return champion.id.toLowerCase();
    }
    async champion (championName) {
        const championNameEnglish = await this.convertChampNameFromJpToEnglish(championName);
        console.log("name: ", championNameEnglish);
        return `https://jp.op.gg/champion/${championNameEnglish}/statistics`;
    }

    doRequest(options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(res.body);
                } else {
                    reject(error);
                }
            });
        });
    }
};

// const opgg = new Opgg();
// new Promise(() => {
//
// });
// console.log(opgg.champion('ダイアナ'));