const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs');
const axios = require('axios')

const viewsPath = path.join(__dirname, './views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    var d = new Date();
d = d.toString();
d = d.split(' ').splice(0,4).join(' ');
let one = "https://api.darksky.net/forecast/0a66aae43f53b833b90117d8a6e9cf49/19.4326,-99.1332?units=us"
let two = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=V31LPRNO68PPQF9H"
let three = "https://corona.lmao.ninja/countries/usa,mexico"
let four = "https://corona.lmao.ninja/all"
let five = "https://www.reddit.com/r/worldnews/top/.json?count=2&t=day"
let six = 'https://www.reddit.com/r/news/top/.json?count=2&t=day'

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
const requestFour = axios.get(four);
const requestFive = axios.get(five);
const requestSix = axios.get(six);

axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix]).then(axios.spread((...responses) => {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responseThree = responses[2];
    const responseFour = responses[3];
    const responseFive = responses[4];
    const responseSix = responses[5];

    let weatherData = responseOne.data;
    let currentTemp = weatherData.currently.temperature;
    let summary = weatherData.daily.data[0].summary;
    let rain = Math.round(weatherData.daily.data[0].precipProbability * 100);
    let high = weatherData.daily.data[0].temperatureHigh;
    let low = weatherData.daily.data[0].temperatureLow;

    let keys = Object.keys(responseTwo.data["Time Series (Daily)"]);
    let todayPrice = responseTwo.data["Time Series (Daily)"][keys[0]]['4. close'];
    let yesterdayPrice = responseTwo.data["Time Series (Daily)"][keys[1]]['4. close'];
    
    let percentChange = ((todayPrice - yesterdayPrice)/yesterdayPrice) * 100;
    todayPrice = Math.ceil(todayPrice * 100) / 100;
    percentChange =  Math.ceil(percentChange * 100) / 100;
    let className = '';
    if(percentChange >= 0){
        className = 'green';
    }else{
        className = 'red';
    }

    let usaCases = responseThree.data[0].cases;
    let usaTodayCases = responseThree.data[0].todayCases;
    let usaDeaths = responseThree.data[0].deaths;
    let usaTodayDeaths = responseThree.data[0].todayDeaths;
    let mexCases = responseThree.data[1].cases;
    let mexTodayCases = responseThree.data[1].todayCases;
    let mexDeaths = responseThree.data[1].deaths;
    let mexTodayDeaths = responseThree.data[1].todayDeaths;


    let worldCases = responseFour.data.cases;
    let worldTodayCases = responseFour.data.todayCases;
    let worldDeaths = responseFour.data.deaths;
    let worldTodayDeaths = responseFour.data.todayDeaths;

    let worldTitle1 = responseFive.data.data.children[0].data.title;
    let worldUrl1 = responseFive.data.data.children[0].data.url;
    let WorldTitle2 = responseFive.data.data.children[1].data.title;
    let WorldUrl2 = responseFive.data.data.children[1].data.url;

    let usaTitle1 = responseSix.data.data.children[0].data.title;
    let usaUrl1 = responseSix.data.data.children[0].data.url;
    let usaTitle2 = responseSix.data.data.children[1].data.title;
    let usaUrl2 = responseSix.data.data.children[1].data.url;

    res.render('index', {
        date: d,
        currentTemp,
        summary,
        rain,
        high,
        low,
        todayPrice,
        percentChange,
        className,
        usaCases,
        usaTodayCases,
        usaDeaths,
        usaTodayDeaths,
        mexCases,
        mexTodayCases,
        mexDeaths,
        mexTodayDeaths,
        worldCases,
        worldTodayCases,
        worldDeaths,
        worldTodayDeaths,
        worldTitle1,
        worldUrl1,
        WorldTitle2,
        WorldUrl2,
        usaTitle1,
        usaUrl1,
        usaTitle2,
        usaUrl2,
        })


  })).catch(errors => {
  })


    
})

app.use(express.static(path.join(__dirname, './public')));

app.listen(3000, () => {
    console.log('app listening on port 3000')
})