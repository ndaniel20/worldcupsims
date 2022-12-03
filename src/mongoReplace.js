var request = require('request-promise');
var config = require("./config.json");

module.exports = {
    server: async (data, res) => {
    var options = {
        'method': 'POST',
        'url': `https://data.mongodb-api.com/app/data-${config.dataID}/endpoint/data/v1/action/replaceOne`,
        'headers': {
            'api-key': config.apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "collection": "teamsList2",
            "database": "WC_Teams",
            "dataSource": config.source,
            "filter": { "_id": { "$oid": config.objID } },
            "replacement": data
        }),
    };
    var response = await request(options)
    res.send({message: "finished"})
    }
}