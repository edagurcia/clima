// liberia de node para definir el folder de paginas
const path = require('path')
// libreria para crear un servidor web
const express = require('express')
// libreria de HBS
const hbs = require('hbs')
// archivos para requests de clima
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]

// iniciarlizar el servidor express
const app = express()
// Definir los path para configuracion de express
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Ubicacion de Handlebars y vistas
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Directorio de componentes estaticos
app.use(express.static(publicDirectory))

// Rutas del sitio web
app.get('', (req, res) => {
    res.render('index', {
        title: 'Mi Clima',
        name: '@EDAgurcia'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de mí',
        name: '@EDAgurcia'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ayuda',
        message: 'Con mucho gusto ayudaremos a sus consultas.',
        name: '@EDAgurcia'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Debe proporcionar una localidad.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })    
})

//Pagina 404 para cuando no existe una pagina en nuestro sitio
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Articulo no encontrado.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Pagína no encontrada.'
    })
})

// Servidor web con express
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})