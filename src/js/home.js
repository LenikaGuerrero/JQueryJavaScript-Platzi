(async function load() {
    //------------------------------------------------------------Usuarios
    async function getUsersData(url) {
        const response = await fetch(url);
        const data = await response.json();
        if (data.info.results > 0) {
            return data;
        }
        throw new Error('No Hay Amigos Conectados')
    }

    const USERS_API = 'https://randomuser.me/api/?results=10';
    const { results: usersList } = await getUsersData(USERS_API);
    const $listFriendsContainer = document.querySelector('#listFriends');

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function friendTemplate(user) {
        const { name, picture } = user
        return (
            `<li class="playlistFriends-item" data-firstname="${name.first}">
      <a href="#">
        <img src="${picture.thumbnail}" alt="${name.first} ${name.last} avatar" />
        <span>
          ${capitalize(name.first)} ${capitalize(name.last)}
        </span>
      </a>
    </li>`
        )
    }

    function findByName(name, list) {
        return list.find(element => element.name.first === name)
    }

    function showFriendModal($element) {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        const { firstname } = $element.dataset;
        const {
            name,
            picture,
            email,
            dob,
            location,
            phone
        } = findByName(firstname, usersList);
        $modalTitle.textContent = `${capitalize(name.first)} ${capitalize(name.last)}`;
        $modalImage.setAttribute('src', picture.large);
        $modalDescription.innerHTML = `
      <strong>Email:</strong> ${email}<br>
      <strong>Phone:</strong> ${phone}<br>
      <strong>Age:</strong> ${dob.age}<br>
      <strong>Location:</strong> ${capitalize(location.city)}. ${capitalize(location.state)}
    `;
    }

    function userClick($container) {
        const listFriends = Array.from($container.children);
        listFriends.forEach(($element) => {
            $element.addEventListener('click', function() {
                showFriendModal($element);
            })
        })
    }

    function renderlistFriends($container, list) {
        $container.children[0].remove();
        list.forEach((user) => {
            const HTMLString = friendTemplate(user);
            $container.innerHTML += HTMLString;
        })
        userClick($container)
    }

    renderlistFriends($listFriendsContainer, usersList);

    //-----------------------------------------------------------Peliculas
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        if (data.data.movie_count > 0) {
            //aqui se acaba
            return data
        }
        //si no hay peliculas aqui continua 
        throw new Error('No se encontro ningun resultado')
    }

    //------------------------------------------------------------ Catalogo
    const BASE_API = 'https://yts.mx/api/v2/list_movies.json?'

    const $form = document.getElementById('form')
    const $featuringContainer = document.getElementById('featuring')

    const $home = document.getElementById('home')

    function setAttributes($element, attributes) {
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute])
        }
    }

    function featuringTemplate(pelicula) {
        return (
            `<div class="featuring">
                <div class="featuring-image">
                    <img src="${pelicula.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${pelicula.title}</p>
                </div>
            </div>`
        )
    }

    $form.addEventListener('submit', async(event) => {

        event.preventDefault()
        $home.classList.add('search-active')
        const $loader = document.createElement('img')
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            heigth: 50,
            width: 50,
        })
        $featuringContainer.append($loader)

        /*FormData va a abstraer todos los valores de los elementos del formulario que cuenten 
        con un atributo 'name' asignado y los junta en un objeto de tipo FormData*/
        const data = new FormData($form);
        try {
            //pelicula.data.movies[0]
            const {
                data: {
                    movies: pelicula
                }
            } = await getData(`${BASE_API}limit=1&query_term=${data.get('name')}`) //retorna el valor del elemento con el atributo name="nombre"
            const HTMLString = featuringTemplate(pelicula[0])
            $featuringContainer.innerHTML = HTMLString
        } catch (error) {
            alert(error.message)
            $loader.remove()
            $home.classList.remove('search-active')
        }

    })


    function videoItemTemplate(movie, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
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

    function addEventClick($element) {
        $element.addEventListener('click', () => {
            showModal($element)
        })
    }

    function renderMovieList(list, $container, category) {
        $container.children[0].remove()
            //actionList.data.movies
        list.forEach((movie) => {
            const HTMLString = videoItemTemplate(movie, category); // Texto de HTML
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement)
            const image = movieElement.querySelector('img') //Aplicar la clase solo a las imagenes
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn')
            })

            addEventClick(movieElement)
        })
    }

    //Action
    const { data: { movies: actionList } } = await getData(`${BASE_API}genre=action`)
    const $actionContainer = document.querySelector('#action')
    renderMovieList(actionList, $actionContainer, 'action')

    //Adventure
    const { data: { movies: adventureList } } = await getData(`${BASE_API}genre=adventure`)
    const $adventureContainer = document.getElementById('adventure')
    renderMovieList(adventureList, $adventureContainer, 'adventure')

    //Animation
    const { data: { movies: animationList } } = await getData(`${BASE_API}genre=animation`)
    const $animationContainer = document.getElementById('animation')
    renderMovieList(animationList, $animationContainer, 'animation')

    //-------------------------------------------------------- Modal
    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    //Busqueda en el espacio previamente mencionado (Modal)
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')

    function findById(list, id) {
        return list.find(movie => movie.id === parseInt(id, 10))
    }

    function findMovie(id, category) {
        switch (category) {
            case 'action':
                return findById(actionList, id)
                break;
            case 'adventure':
                return findById(adventureList, id)
                break;
            case 'animation':
                return findById(animationList, id)
                break;

            default:
                break;
        }

    }

    function showModal($element) {
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
        const id = $element.dataset.id //guarda el valor de data-id
        const category = $element.dataset.category //guarda el valor de data-category
        const data = findMovie(id, category)

        $modalTitle.textContent = data.title
        $modalImage.setAttribute('src', data.medium_cover_image)
        $modalDescription.textContent = data.description_full
    }

    $hideModal.addEventListener('click', hideModal)

    function hideModal() {
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    }

    //------------------------------------------------------------ Top Ten


    const $myPlaylistContainer = document.querySelector('#myPlaylist');

    function itemTemplate(movie, category) {
        return (
            `<li class="myPlaylist-item" data-id="${movie.id}" data-category="${category}">
                <span>${movie.title}</span>
            </li>`
        )
    }

    function renderFavoriteList(list, $container, category) {
        $container.children[0].remove();
        list.forEach(movie => {
            const HTMLString = itemTemplate(movie, category);
            $container.innerHTML += HTMLString;
        })

    }

    const { data: { movies: scifiList } } = await getData(`${BASE_API}list_movies.json?genre=sci-fi&limit=10`)
    renderFavoriteList(scifiList, $myPlaylistContainer, 'scifi');
})()