window.onload = async function(){
    var url = window.location.search
    var matched = url.match(/\d+/g)
        
    const homeBtn = document.getElementById('homeBtn')
    var gap = localStorage.getItem("interval") || 2
    var playBtn = document.getElementsByClassName("play-button-outer")[0]
    var chosen1 = matched[0] || "0"
    var chosen2 = matched[1] || "1"
    var time = document.querySelector("body > div > div.page-header > div > span")
    var scoreline = document.querySelector("body > div > div.page-score > div.score-line > b")
    var clock = 0
    var score1 = 0
    var score2 = 0
    var sounds = []
    var data = JSON.stringify({ 
        "homeTeam": chosen1, 
        "awayTeam": chosen2
    });
    var response = await postReq(`${location.origin}/simulate`, data).catch(function(err) {
        console.log("OFFLINE MODE");
    });
    var lineup1 = response?.homeXI
    var lineup2 = response?.awayXI

    document.getElementsByClassName("home-name")[0].textContent = teams[chosen1].name
    document.getElementsByClassName("away-name")[0].textContent = teams[chosen2].name
    document.getElementsByClassName("flag-img1")[0].src = teams[chosen1].flag
    document.getElementsByClassName("flag-img2")[0].src = teams[chosen2].flag

    homeBtn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}`;
    });

    playBtn.addEventListener('click', startGame)
    
    function startGame(){
        if (lineup1) document.getElementsByClassName("home-lineup")[0].style.display = "block"
        if (lineup2) document.getElementsByClassName("away-lineup")[0].style.display = "block"

        playBtn.remove()
        playAudio('/css/whistle.mp3')
        var timeGap = setInterval(async function () {
            clock += 5
            if (clock == 95){
                playAudio('/css/whistle.mp3')
                time.textContent = "Full Time"
                return clearInterval(timeGap)
            }
            time.textContent = `${clock.toString()}'`
            var homeRank = teams[chosen1].rank
            var awayRank = teams[chosen2].rank
            var data = await RNGSimulation(homeRank, awayRank, lineup1, lineup2)
            if (data?.team == 0 || data?.team == 1){
                if (data.team == 0) score1 += 1
                if (data.team == 1) score2 += 1
                playAudio('/css/goal.mp3')
                scoreline.textContent = `${score1}-${score2}`
                document.getElementById('timeline').innerHTML += 
                `<div class="team-event-${data.team}">
                    <span style="margin-left: 5px;margin-bottom: 10px;">${clock}'</span> 
                    <img style="margin-left: 5px;margin-bottom: 10px;" height=15px src="https://i.imgur.com/YcAF6V9.png">
                    <span style="margin-left: 5px;margin-bottom: 10px;overflow: hidden;max-width: 105px;">${data.player}</span> 
                    <img style="margin-left: 5px;margin-bottom: 10px;border-radius: 30px;background-color: #63709a;" height=20px src=${data.face}>
                </div>`
            }
        }, (5 - gap) * 1000);
    }

    function playAudio(path){
        sounds.forEach(s=>s.pause())
        var snd = new Audio(path);
        var vol = localStorage.getItem("volume") || 5
        snd.volume = vol/10
        sounds.push(snd)
        snd.play();
    }
    
    async function postReq(url, selectedTeams){
        var res = await fetch(url, {
            method: 'POST',
            body: selectedTeams,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        var d = await res.json()
        return d;
    }

    function randomRange(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    function RNGSimulation(r1, r2, lineup1, lineup2){
        var chnc = localStorage.getItem("chance") || 13
        var i1 = (16 - parseFloat(chnc)) + (r1-r2)/3
        var i2 = (16 - parseFloat(chnc)) + (r2-r1)/3

        var randomInt1 = randomRange(0, i1)
        var randomInt2 = randomRange(0, i2)

        if (randomInt1 == 0){
            if (lineup1) var player = lineup1.slice(0,10).filter(p=>randomRange(0, 10) > 5)[0]
            else var player = {player: "Player", face: "https://cdn.sofifa.net/players/notfound_0_120.png"}
            player.team = 0
        }
        else if (randomInt2 == 0){
            if (lineup2) var player = lineup2.slice(0,10).filter(p=>randomRange(0, 10) > 5)[0]
            else var player = {player: "Player", face: "https://cdn.sofifa.net/players/notfound_0_120.png"}
            player.team = 1
        }

        return player
    }
}