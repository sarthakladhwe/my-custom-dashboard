const imageAuthor = document.getElementById('image-author')
const cryptoDiv = document.getElementById('crypto')
const weatherDiv = document.getElementById('weather')
const currentTimeEl = document.getElementById('current-time')

fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=space`, {
    headers: {
        "Authorization": "Client-ID F62xfIUzI0CFmQRGkxF6rbYlhxk20pxp11xvECFMVYg"
    }
})
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        imageAuthor.textContent = `By: ${data.user.username}`
        imageAuthor.href = data.user.links.html
    })
    .catch(err => {
        console.log(err)
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzk3NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTU4MDQ1ODk&ixlib=rb-1.2.1&q=80&w=1080")`
    })

fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=bitcoin,dogecoin,ethereum,litecoin`)
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong!")
        } 
        return res.json()
    })
    .then(data => {
        for(let crypto of data) {
            const divEl = document.createElement('div')
            divEl.classList.add("inner-crypto")
            divEl.innerHTML = `
                <img src=${crypto.image} alt=${crypto.id} width="18px"/>
                <p>${crypto.name} - ₹${crypto.current_price}</p>
            `
            cryptoDiv.appendChild(divEl)
        }
    })
    .catch(err => {
        console.log(err)
        const divEl = document.createElement('div')
        divEl.innerHTML = `Can't load the Crypto Market! 😔`
        divEl.style.fontSize = "12px"
        cryptoDiv.appendChild(divEl)
    })

function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a410e420eb732896d7b839d3ecd7df1d`)
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong!")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        weatherDiv.innerHTML = `
            <div class="temp">
                <h3>${data.main.temp.toFixed(1)}°C</h3>
                <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" title=${data.weather[0].description} alt=${data.weather[0].description} />
            </div>
            <h3>${data.name}</h3>
        `
    })
}

function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString("en-US", {timeStyle: "short"})
    currentTimeEl.textContent = currentTime
}   

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
    getCurrentWeather(position.coords.latitude, position.coords.longitude);
});
