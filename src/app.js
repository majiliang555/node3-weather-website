const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)


const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res)=>{
//     res.send('Hello express!')
// })

// app.get('')

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: "Andrew",
//         age: 27
//     },{
//         name: "tom",
//         age:15
//     }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
// })
app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather APP",
        name: "TOm"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About me",
        name: "Jerry Ma"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: "THis is some helpful info",
        title: "help",
        name: "Jerry Ma"
    })
})


app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecasr: "It is snowing",
    //     location: "Philadelphia",
    //     address: req.query.address
    // })
})



app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res)=>{
    res.render('404',{
        title: '404',
        name:"Jerrryme",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name:"Jerrryme",
        errorMessage: "Page not found"
    })

})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})
