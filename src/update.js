var request = require('request-promise');
const mongoDB = require('./mongoReplace.js')

var headers = {"referrerPolicy": "strict-origin-when-cross-origin", "method": "GET"}
var obj = {}
var arr = []
var list = [
    'Argentina',   'Australia',    'Belgium',
    'Brazil',      'Cameroon',     'Canada',
    'Costa Rica',  'Croatia',      'Denmark',
    'Ecuador',     'England',      'France',
    'Germany',     'Ghana',        'Iran',
    'Japan',       'Mexico',       'Morocco',
    'Netherlands', 'Poland',       'Portugal',
    'Qatar',       'Saudi Arabia', 'Senegal',
    'Serbia',      'South Korea',  'Spain',
    'Switzerland', 'Tunisia',      'USA',
    'Uruguay',     'Wales'
  ]

module.exports = {
    set: async (res) => {
    var i = 0
    findTeam(list[i])

    async function findTeam(term){
        var body = await request(`https://apigw.fotmob.com/searchapi/suggest?term=${term}`, headers)
        var parsed = JSON.parse(body)
        var id = parsed.teamSuggest[0].options[0].payload.id
        getLastMatch(id)
    }
        
    async function getLastMatch(id){
        var body = await request(`https://www.fotmob.com/api/teams?id=${id}&tab=overview&type=team&timeZone=Europe/Paris`, headers)
        var data = JSON.parse(body)
        var fixtures = data.fixtures.allFixtures.fixtures
        var lastGame = fixtures.filter(g=>(g.status.finished || g.status.ongoing) && g.tournament.name == "World Cup").reverse()[0]
        matchInfo(lastGame.id, id)
    } 
        
    async function matchInfo(id, teamID){
        var body = await request(`https://www.fotmob.com/api/matchDetails?matchId=${id}`, headers)
        var parsed = JSON.parse(body)
        var content = parsed.content
        var selections = content.lineup.lineup
        var lineup = selections.find(t=>t.teamId == teamID)
        var index = selections.indexOf(lineup)
        if (index == 0) var players = lineup.players.reverse()
        else var players = lineup.players
        players.forEach(p=>{
            p.forEach(t=>{
                arr.push({player: t.name.lastName, face: t.imageUrl})
            })
        })
        obj[list[i]] = arr
        i++
        arr = []
        if (i != list.length) return findTeam(list[i])
        console.log("Finished updating teams")
        mongoDB.server(obj, res)
    }
    }
}