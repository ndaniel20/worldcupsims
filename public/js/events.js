window.onload = async function(){
    var savedIndex1 = 0
    var savedIndex2 = 0
    const arrs = document.querySelectorAll('[class^=arrow1]')
    const arrs2 = document.querySelectorAll('[class^=arrow2]')
    const rating = document.getElementsByClassName("club-rating")[0]
    const rating2 = document.getElementsByClassName("club-rating")[1]
    const btn = document.getElementById('but2')
    const homeBtn = document.getElementById('homeBtn')

    //ratinfgs
    function addRatings(rating, team){
        rating.innerHTML = ''
        var rank = team.rank
        var stars = 5 - Math.floor(rank/4)/2
        for(let i=0; i < Math.round(stars); i++){ 
            if (stars % 1 == 0 && i == Math.round(stars) - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/RvDeT0k.png">'
            if (stars % 1 != 0 && i == Math.round(stars) - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/d300gz5.png">'
            if (i < stars - 1) rating.innerHTML += '<img height="35px" style="margin-left: 7px;" src="https://i.imgur.com/RvDeT0k.png">'
        } 
    }

    if (rating) addRatings(rating, teams[savedIndex1])
    if (rating2) addRatings(rating2, teams[savedIndex2])

    //arrows
    function selectOptions(i, savedIndex){
        document.getElementsByClassName('club-name')[i].innerHTML = `<p>${teams[savedIndex].name}</p> `
        document.getElementsByClassName('league-name')[i].innerHTML = `<b>${teams[savedIndex].league}</b> `
        document.getElementsByClassName('country-flag')[i].innerHTML = `<img src=\"${teams[savedIndex].flag}\" style="height: 46px;">`
        document.getElementsByClassName('club-logo')[i].innerHTML = `<img src=\"${teams[savedIndex].logo}\">`
    }

    selectOptions(0, savedIndex1)
    selectOptions(1, savedIndex2)

    arrs.forEach(a => {
        a.addEventListener('click', async event => {
            if (event.target.id == 'left-arrow') savedIndex1 += -1
            if (event.target.id == 'right-arrow') savedIndex1 += 1

            if (savedIndex1 > teams.length-1) savedIndex1 = 0
            if (savedIndex1 < 0) savedIndex1 = teams.length-1

            selectOptions(0, savedIndex1)
            addRatings(rating, teams[savedIndex1])
        });
    });

    arrs2.forEach(a => {
        a.addEventListener('click', async event => {
            if (event.target.id == 'left-arrow') savedIndex2 += -1
            if (event.target.id == 'right-arrow') savedIndex2 += 1

            if (savedIndex2 > teams.length-1) savedIndex2 = 0
            if (savedIndex2 < 0) savedIndex2 = teams.length-1

            selectOptions(1, savedIndex2)
            addRatings(rating2, teams[savedIndex2])
        });
    });
    
    //buttons
    homeBtn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}`;
    });

    btn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}/simulate?h=${savedIndex1}&a=${savedIndex2}`;
    });

    preloadImages(teams.map(t=>t.logo))
    preloadImages(teams.map(t=>t.flag))

    function preloadImages(array) {
        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        var list = preloadImages.list;
        for (var i = 0; i < array.length; i++) {
            var img = new Image();
            list.push(img);
            img.src = array[i];
        }
    }
}