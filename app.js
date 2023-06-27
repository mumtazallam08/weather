const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){

    res.sendFile(__dirname +"/index.html")
});

app.post('/weather', function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=5be0da62a82ec180272d0555b32f02ef";

    https.get(url,(response)=>{
        response.on('data', function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageIcon = "https://openweathermap.org/img/wn/03n@2x.png";

            res.write("<h1>Today the temperature in "+ query +" is "+temp+"</h1>");
            res.write("<p>Description is "+ description+"</p>");
            res.write("<img src="+imageIcon+">")
            res.send();
            console.log(description, icon, temp);
        })
    });

});



app.listen(3000);