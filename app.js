Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGU0MzIxYi04NGQ3LTQ0MmMtOTE3OC0zYWNmZWRjOWFhZmUiLCJpZCI6MjIwMjI2LCJpYXQiOjE3MTc1ODE0ODJ9.WydtIoC2biWNOB1uH4F7zFz52xrrmh58RR0k7jvBt14'

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Cesium Viewer
    var viewer = new Cesium.Viewer('cesiumContainer')

    // Create a ScreenSpaceEventHandler to handle click events
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

    handler.setInputAction(function(event) {
        // Get the Cartesian position from the mouse click
        var cartesian = viewer.scene.pickPosition(event.position)

        if (cartesian) {
            // Convert Cartesian to Cartographic (longitude and latitude)
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian)

            var longitude = Cesium.Math.toDegrees(cartographic.longitude)
            var latitude = Cesium.Math.toDegrees(cartographic.latitude)

            console.log('Longitude: ' + longitude + ', Latitude: ' + latitude)

           // Call the API to get the weather
           var weatherApiKey = '9926614243fddec7800bdcd4682352e7'
           var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`

           console.log('Weather API URL:', weatherUrl)

           fetch(weatherUrl)
               .then(response => {
                   if (!response.ok) {
                       throw new Error('Network response was not ok')
                   }
                   return response.json()
               })
               .then(data => {
                   console.log('Weather API Response:', data)

                   if (data && data.weather && data.weather.length > 0) {
                       var weatherDescription = data.weather[0].description
                       var temperature = data.main.temp
                       alert(`Weather: ${weatherDescription}, Temperature: ${temperature}°C`)
                   } else {
                       alert('Weather information not found')
                   }
               })
               .catch(error => {
                   console.error('Error:', error)
                   alert('An error occurred while retrieving the weather information.')
               })
       }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})