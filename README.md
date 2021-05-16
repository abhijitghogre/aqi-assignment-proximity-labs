## AQI monitor

### Dashboard
Dashboard shows live aqi of all the cities.
Background color of the city bar denotes the AQI quality of that city.
To see how the AQI is changing over time, just click on the city bar to expand it.
Clicking it again will close the chart. The chart shows recent 20 readings of the AQIs (can be adjusted in the utils function). 

### Comparison
Click on 'Compare' in the header to go to the comparison page. This page shows live comparison of the AQI among all the cities.


----

#### Notes and possible enhancements:
- The app is responsive and can be opened in both mobile devices and desktop.
- Websocket failure handling / fallback could be added.
- I would use typescript for a production project for better type safety.
- We could give option to pin the cities that user is interested in.
