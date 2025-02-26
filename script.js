let weather = {
  apiKey: "bf12996d47b1cb44b9f4e3c031d2fa99",
  fetchWeather: function (city) {
    //fetch need time and we need with it .then (2) the first still as it but we do manopulatione in the second
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        // if (!response.ok) {
        //   alert("No weather found.");
        //   throw new Error("No weather found.");
        // }
        return response.json();
      })
      .then((data) => {
        if(data["cod"]== 400){alert("you have isuue in url!") 
          return}
           else if(data["cod"]==401){alert("the Api used in this site is expired!")
            return}
           else if(data["cod"]==404){alert("city not found! can u sheck if it's wrong plz")
            return}
           else{this.displayWeather(data)

            let unsplashKey="rx2ZvyXzX2i5DXH_8obnQztlMunLb28pcqcFCLOInzM";
      fetch(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}&orientation=landscape`
      )
      .then((sod) => {
        return sod.json();
      })

      .then((sod) => {
        console.log(sod);
        // console.log(  sod["results"][0]["urls"]["full"]  ); //we need quotes here to words between
    
      // Math.floor(Math.random() * (sod[results].length -1));

        
        let imgindex= Math.floor(Math.random() * (sod["results"].length -1));
        let BGimg= sod["results"][imgindex]["urls"]["full"];
        // let BGimg= sod["results"][0]["urls"]["full"]; 



        console.log(BGimg)
        document.body.style.backgroundImage = `url(${BGimg})`;
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

  })
           }

        
      }
        )
    

      
      //we need to put random image in the background img
},
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  //   document.body.style.backgroundImage =
  //     "url('https://images.unsplash.com/photo-1596607803886-f10532848319?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MDg0MDJ8MHwxfHNlYXJjaHwyfHxiZWlydXR8ZW58MHwwfHx8MTczOTI5MjA1OHww&ixlib=rb-4.0.3&q=85" + name + "')";
   },
  search: function () {
    let thecity=document.querySelector(".search-bar").value.trim();
    if( thecity == ""){
      alert("plz you can't search about empty city!!!")
    return}
      else{
    this.fetchWeather(document.querySelector(".search-bar").value);}
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");



// http code handling
// 404 => city not found
// 401 => wrong api key
// 400 => isuue in url >>> bad request
//200 => it's good
