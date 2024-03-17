/* Global Variables */
const apiKey = 'c94c953d763a3be1410d7d2f61f43a8c';
const openWeatheUrl = 'https://api.openweathermap.org/data/2.5/weather';


document.getElementById('generate').addEventListener('click', performAction);


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    const url = openWeatheUrl + '?q=' + zipCode + '&APPID=' + apiKey;

    if (!zipCode.trim() || !feelings.trim()) {
        alert('Please fill out both the zipcode and your feelings.');
        return;
    }

    fetchTemperature(url)
        .then(function (temp) {
            console.log("Recieved temperature: " + temp);
            postData('/record', { date: newDate, temperature: temp, userResponse: feelings });
        }).then(updateUI);
}

// Calling OpenWeatherMap service
const fetchTemperature = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        const temp = data.main.temp;
        console.log(temp);
        return temp;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Pos
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const response = await request.json();
        const records = response.records;
        document.getElementById('date').innerHTML = 'Recent Date: ' + records[records.length-1].date;
        document.getElementById('temp').innerHTML = 'Recent Tempereture: ' + records[records.length-1].temperature;
        document.getElementById('content').innerHTML = 'Recent Feelings: ' + records[records.length-1].userResponse;
        
    } catch (error) {
        console.log("error", error)
    }
}





