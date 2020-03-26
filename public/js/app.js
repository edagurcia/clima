// Creado por Edmundo Dominguez Agurcia
const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = document.querySelector('#address').value
    console.log(address)
    // Modificar para Heroku y nuestra maquina local
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.getElementById('error').innerHTML = data.error
                document.getElementById('location').innerHTML = ''
                document.getElementById('forecast').innerHTML = ''                               
            }else{
                document.getElementById('location').innerHTML = data.location
                document.getElementById('forecast').innerHTML = data.forecast                
                document.getElementById('error').innerHTML = ''
            }
        })
    })
})