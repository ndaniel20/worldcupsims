window.onload = async function(){
    const homeBtn = document.getElementById('homeBtn')
    const saveBtn = document.getElementById('save-btn')
    const updateBtn = document.getElementById('update')
    const soundSlider = document.getElementById('sound')
    const chanceSlider = document.getElementById('chance')
    const intervalSlider = document.getElementById('interval')

    var volume = localStorage.getItem("volume") || 50
    var chance = localStorage.getItem("chance") || 13
    var interval = localStorage.getItem("interval") || 2

    soundSlider.value = volume;
    chanceSlider.value = chance;
    intervalSlider.value = interval;

    homeBtn?.addEventListener('click', async event => {
        document.location.href = `${location.origin}`;
    });

    saveBtn?.addEventListener('click', async event => {
        console.log(soundSlider.value)
        console.log(chanceSlider.value)
        console.log(intervalSlider.value)

        localStorage.setItem("volume", soundSlider.value)
        localStorage.setItem("chance", chanceSlider.value)
        localStorage.setItem("interval", intervalSlider.value)
    });

    updateBtn.addEventListener('click', async event => {
        updateBtn.disabled = true 
        updateBtn.innerText = 'Fetching...'
        updateBtn.style.filter = "brightness(50%)";

        var response = await getReq(`${location.origin}/update`)
        console.log(response)

        updateBtn.disabled = false 
        updateBtn.innerText = 'Update'
        updateBtn.style.filter = "brightness(100%)";
    });

    async function getReq(url){
        var res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        var d = await res.json()
        return d;
    }
}