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