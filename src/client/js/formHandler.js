const apiToken = '';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';


async function getWeatherInfo(zipCode) {
    const url = `${baseUrl}?zip=${zipCode}&appId=${apiToken}&units=imperial`;
    const response = await fetch(url);
    const { status } = response;
    const newData = await response.json();
    if (status !== 200) {
      if (newData.message === 'city not found') {
        return Promise.reject('cityNotFound');
      }
      return Promise.reject('statusCodeError');
    }
    return newData;
  }
  

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    getWeatherInfo(formText)
    .then(function(res) {
        document.getElementById('results').innerHTML = `${res.main.temp} °F in ${res.name} `;
    })
}

export { handleSubmit }
