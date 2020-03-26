const request = require('request')

const geocode = (address, callback) => {
    const llave = 'pk.eyJ1IjoiZWRhZ3VyY2lhIiwiYSI6ImNrODBnZmp2NjAwMGkzbHF0Z2VxbWIzZnAifQ.zVjJp_1lksRwHwUcQoyzqw&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + llave
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('No es posible contactar el servicio de Georeferencia.', undefined)
        }else if(body.features.length === 0){
            callback('Imposible encontrar la ciudad deseada, intentelo con una diferente.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode