(async function load() {
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const adventureList = await getData('https://yts.mx/api/v2/list_movies.json?genre=adventure')
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')

    function videoItemTemplate(movie) {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">${movie.title}</h4>
            </div>`
        )
    }

    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument() //Documento de HTML
        html.body.innerHTML = HTMLString

        return html.body.children[0] //Primer elemento del HTML
    }

    function renderMovieList(list, $container) {
        $container.children[0].remove()
            //actionList.data.movies
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie); // Texto de HTML
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement)
        })
    }

    const $actionContainer = document.querySelector('#action')
    const $adventureContainer = document.getElementById('adventure')
    const $animationContainer = document.getElementById('animation')

    renderMovieList(actionList.data.movies, $actionContainer)
    renderMovieList(adventureList.data.movies, $adventureContainer)
    renderMovieList(animationList.data.movies, $animationContainer)


    const $home = document.getElementById('#home')

    //-------------------------------------------------------- Formulario
    const $featuringContainer = document.getElementById('#featuring')
    const $form = document.getElementById('#form')

    //-------------------------------------------------------- Modal
    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    //Busqueda en el espacio previamente mencionado (Modal)
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')



    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'))

})()