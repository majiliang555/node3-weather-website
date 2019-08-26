const request = require('request')


const forecast = (latitude, longitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/8dc7e521cc86b2aafe182d5c97ebcc58/' + latitude +',' + longitude
    request({url, json:true},(error, {body})=>{
        if (error){
            callback("Unable to connect to weather service!", undefined)
        }else if(body.error){
            callback("Unbale to find location!", undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+ " It is currently " + body.currently.temperature + " degrees out there. This high today is " + body.daily.data[0].tempeatureHigh + ' with a low of  ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + "% chance of rain")
        }

    })
 }

 module.exports = forecast