const getUserAll = new Promise(function(todoBien, todoMal) {
    setTimeout(() => todoBien('Se acabo el tiempo'), 5000)
})
const getUser = new Promise(function(todoBien, todoMal) {
        //llamar a un Api
        //setInterval - Funcion de JavaScript que se ejecuta cada cierto tiempo
        //setTimeout - Funcion de JavaScript se ejecuta una vez cada cierto tiempo
        setTimeout(() => todoBien('Se acabo el tiempo 3'), 3000)
    })
    //-------------------------------------------------
    // getUser
    //     .then(function() {
    //         //Promesa Correcta
    //         console.log('Bien')
    //     })
    //     .catch(function(message) {
    //         //Error en Promesa
    //         console.log(message)
    //     })
    //-------------------------------------------------
    //Varias Promesas a la vez
    //then se ejecuta cuando terminen todas las promesas
    //catch se ejecuta en el primer error
    // Promise.all([
    //         getUser,
    //         getUserAll,
    //     ])
    //     .then((message) => console.log(message))
    //     .catch((message) => console.log(message))
    //-------------------------------------------------
    //Carrera de Promesas
    //Se ejecuta en then de la promesa que termine primero 
Promise.race([
        getUser,
        getUserAll,
    ])
    .then((message) => console.log(message))
    .catch((message) => console.log(message))

//---------------------------------------------------- AJAX - JQuery
$.ajax('https://randomuser.me/api/asdas', {
    //Traer Datos: GET - Mandar Datos: POST
    method: 'GET',
    //Success se ejecuta cuando todo sale bien
    //data: lo que devuelve del api 
    success: (data) => console.log(data),
    //Error se ejecuta cuando hay un errors
    //error: mensaje de error del api 
    error: (error) => console.log(error),
})

//--------------------------------------------------- JavaScript
fetch('https://randomuser.me/api/awdaw') // fetch devuelve una promesa
    .then((response) => response.json()) //return
    .then((user) => console.log('user', user.results[0].name.first))
    .catch(() => console.log('Algo Fallo'));


(async function load() {
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const adventureList = await getData('https://yts.mx/api/v2/list_movies.json?genre=adventure')
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
    console.log(actionList, adventureList, animationList)

    //----------------------------------JQuery
    //const $home = $('.home') //Elemento del DOM con la CLASE home
    //const $home = $('#home') //Elemento del DOM con el ID home
    //----------------------------------JavaScript

    // Retorna un elemento con el ID modal
    const $home1 = document.getElementById('modal')
        //Retorna una lista de elementos con la CLASE modal
    const $home2 = document.getElementsByClassName('modal')
        // Retorna una lista de elementos con el TAG div
    const $home3 = document.getElementsByTagName('div')
        // Devuelve el primer elemento que coincida con el Query de busqueda
    const $home4 = document.querySelector('.myPlaylist-item')
        // Devuelve todos los elementos que coincidan con el Query de busqueda
    const $home4 = document.querySelectorAll('.myPlaylist-item')

})() //Ejecuta la funcion automaticamente