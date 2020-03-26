const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5b89533f09d9a756286fe796ea4aaa25/' + latitude + ',' + longitude + '?lang=es&units=si'
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('No es posible contactar el servicio de clima.', undefined)
        } else if(body.error){
            callback('No encontramos la ciudad solicitada.', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' Temperatura actual de ' + body.currently.temperature + ' grados C. La temperatura máxima sera de ' + body.daily.data[0].temperatureHigh + ' grados C. Con una temperatura mínima de ' + body.daily.data[0].temperatureLow + ' grados C. Probabilidad de ' + body.currently.precipProbability + '% de lluvias.')
        }
    })
}
module.exports = forecast