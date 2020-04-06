var d = new Date();
d = d.toString();
d = d.split(' ').splice(0,4).join(' ');
document.getElementById('date-display').innerHTML = '<strong>' + d + '</strong>';
axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0a66aae43f53b833b90117d8a6e9cf49/19.4326,-99.1332?units=us')
.then((res) => {
    let weatherData = res.data;
    let currentTemp = weatherData.currently.temperature;
    let summary = weatherData.daily.data[0].summary;
    let rain = weatherData.daily.data[0].precipProbability;
    let high = weatherData.daily.data[0].temperatureHigh;
    let low = weatherData.daily.data[0].temperatureLow;
    document.querySelector('#weather-summary').innerHTML = '<strong>Summary: </strong>'+summary;
    document.querySelector('#current-temp').innerHTML = `<strong>Temp:</strong> ${currentTemp}`;
    document.querySelector('#weather-temps').innerHTML = `<strong>High/Low:</strong> ${high}/${low}`;
    document.querySelector('#weather-rain').innerHTML = '<strong>Rain: </strong>' + rain*100 + '%';
})

axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=V31LPRNO68PPQF9H')
.then(res => {
    let keys = Object.keys(res.data["Time Series (Daily)"]);
    let todayPrice = res.data["Time Series (Daily)"][keys[0]]['4. close'];
    let yesterdayPrice = res.data["Time Series (Daily)"][keys[1]]['4. close'];
    console.log(todayPrice);
    console.log(yesterdayPrice);
    let percentChange = ((todayPrice - yesterdayPrice)/yesterdayPrice) * 100;
    let className = '';
    if(percentChange >= 0){
        className = 'green';
    }else{
        className = 'red';
    }
    document.querySelector('#stock-price').innerHTML = `<strong>SPY: </strong> $${Math.ceil(todayPrice * 100) / 100} <span class=${className}>${Math.ceil(percentChange * 100) / 100}%</span>`
})

axios.get('https://corona.lmao.ninja/countries/usa,mexico')
.then(res => {
    let usaCases = res.data[0].cases;
    let usaTodayCases = res.data[0].todayCases;
    let usaDeaths = res.data[0].deaths;
    let usaTodayDeaths = res.data[0].todayDeaths;
    let mexCases = res.data[1].cases;
    let mexTodayCases = res.data[1].todayCases;
    let mexDeaths = res.data[1].deaths;
    let mexTodayDeaths = res.data[1].todayDeaths;

    document.querySelector('#mexico-cases').innerHTML = `${mexCases} (${mexTodayCases})`;
    document.querySelector('#mexico-deaths').innerHTML = `${mexDeaths} (${mexTodayDeaths})`;
    document.querySelector('#usa-cases').innerHTML = `${usaCases} (${usaTodayCases})`;
    document.querySelector('#usa-deaths').innerHTML = `${usaDeaths} (${usaTodayDeaths})`;
})

axios.get('https://corona.lmao.ninja/all')
.then(res => {
    let worldCases = res.data.cases;
    let worldTodayCases = res.data.todayCases;
    let worldDeaths = res.data.deaths;
    let worldTodayDeaths = res.data.todayDeaths;

    document.querySelector('#world-cases').innerHTML = `${worldCases} (${worldTodayCases})`;
    document.querySelector('#world-deaths').innerHTML = `${worldDeaths} (${worldTodayDeaths})`;
})

axios.get('https://www.reddit.com/r/worldnews/top/.json?count=2&t=day')
.then(res => {
    let title1 = res.data.data.children[0].data.title;
    let url1 = res.data.data.children[0].data.url;
    let title2 = res.data.data.children[1].data.title;
    let url2 = res.data.data.children[1].data.url;

    document.querySelector('#world-1').innerHTML = `<a class='news-link' href=${url1}>${title1}</a>`;
    document.querySelector('#world-2').innerHTML = `<a class='news-link' href=${url2}>${title2}</a>`;
})

axios.get('https://www.reddit.com/r/news/top/.json?count=2&t=day')
.then(res => {
    let usaTitle1 = res.data.data.children[0].data.title;
    let usaUrl1 = res.data.data.children[0].data.url;
    let usaTitle2 = res.data.data.children[1].data.title;
    let usaUrl2 = res.data.data.children[1].data.url;

    document.querySelector('#usa-1').innerHTML = `<a class='news-link' href=${usaUrl1}>${usaTitle1}</a>`;
    document.querySelector('#usa-2').innerHTML = `<a class='news-link' href=${usaUrl2}>${usaTitle2}</a>`;
})