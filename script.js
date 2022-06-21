//client_id=F62xfIUzI0CFmQRGkxF6rbYlhxk20pxp11xvECFMVYg

const imageAuthor = document.getElementById('image-author')

fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=space`, {
    headers: {
        "Authorization": "Client-ID F62xfIUzI0CFmQRGkxF6rbYlhxk20pxp11xvECFMVYg"
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.full})`
        imageAuthor.textContent = `By: ${data.user.username}`
        imageAuthor.href = data.user.links.html
    })

