function logWeatherTest() {
    fetch("https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid=afa7998302266a1d34e7bcfa131689d0")
    .then((response) => {
        return response.json()
    })
    .then()
}