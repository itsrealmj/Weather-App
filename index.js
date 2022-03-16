
let cityName = document.querySelector('#cityName-input')
let form = document.querySelector('form')
let displayData = document.querySelector('.display-container')



document.addEventListener('DOMContentLoaded', function() {
	displayData.innerHTML = `<div class="message-loaded">⬆ Enter city name above </div>`
})


form.addEventListener('submit', function(event) {
	event.preventDefault()
	let APIkey = "e790755874e2f09c40fdb77960f89416"
	let city = cityName.value
	let request = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`

	fetch(request).then(response =>{
		return response.json()
	}).then(data => {
		console.log(data)
		let icon = data.weather[0].icon
		let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

		// getting the weather vibe
		let say = function() {
			if (data.main.temp > 30) {
				return "Beach is callin' 🏖️"
			}else {
				return "Coffee is good idea ☕"
			}
			
		}
			
		displayData.innerHTML = 
								`<div class="clouds-img">
									<img class="maincloud" src="${iconURL}" width="200px" height="100px">
									<img class="cloud30" src="${iconURL}" width="50px" height="50px">
									<img class="cloud50" src="${iconURL}" width="90px" height="90px">
								</div>
									<div class="weather-status">"${say()}"</div>
									<div class="degree">${data.main.temp}&#176</div>
									<div class="place">${data.name}, ${data.sys.country} </div>`
		
	}).catch(error => {
		displayData.innerHTML = `<div class="error">⬆ Please enter valid city name</div>`
	})

	cityName.value = ""
})

