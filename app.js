window.addEventListener("load", () => {
  let lat;
  let long;

  let locationName = document.querySelector(".location-timezone");
  let locationCountry = document.querySelector(".location-country");
  let locationTime = document.querySelector(".location-time");
  let weatherIcon = document.querySelector("img");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureSection = document.querySelector(".temperature-section");
  const temperatureSpan = document.querySelector(".temperature-section span");
  let temperatureWind = document.querySelector(".temperature-wind");
  let temperatureDescription = document.querySelector(
    ".temperature_description"
  );
  let header = document.querySelector("h1");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      var degree = "metric";

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${degree}&daily?id=35&lang=sv&appid=`;

      fetch(api)
        .then((respone) => {
          return respone.json();
        })
        .then((data) => {
          console.log(data);
          temperatureSpan.textContent = "C";
          const { name, sys, timezone, main, weather, wind } = data;
          locationName.textContent = name;
          // locationCountry.textContent = "," + sys.country;
          weatherIcon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
          );

          weatherIcon.setAttribute("alt", weather[0].main);

          temperatureDescription.textContent = weather[0].description;

          //   let celsius = Math.floor(Math.round(main.temp - 273.15));
          //   let fahrenheit = Math.floor(Math.round(main.temp * (9 / 5) - 459.67));
          temperatureDegree.textContent = main.temp;
          temperatureWind.textContent = wind.speed + " m/s";

          //   temperatureSection.addEventListener("click", () => {
          //     if (temperatureSpan.textContent === "C") {
          //       temperatureSpan.textContent = "F";
          //       degree = "fahrenheit";
          //       console.log(degree);
          //       temperatureDegree.textContent = main.temp;
          //     } else {
          //       temperatureSpan.textContent = "C";
          //       temperatureDegree.textContent = main.temp;
          //     }
          //   });
        });
    });
  }
  calendar();
});

function calendar() {
  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  Date.prototype.getWeek = function () {
    dowOffset = typeof dowOffset == "int" ? dowOffset : 0;
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset;
    day = day >= 0 ? day : day + 7;
    var daynum =
      Math.floor(
        (this.getTime() -
          newYear.getTime() -
          (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
          86400000
      ) + 1;
    var weeknum;

    if (day < 4) {
      weeknum = Math.floor((daynum + day - 1) / 7) + 1;
      if (weeknum > 52) {
        nYear = new Date(this.getFullYear() + 1, 0, 1);
        nday = nYear.getDay() - dowOffset;
        nday = nday >= 0 ? nday : nday + 7;
        weeknum = nday < 4 ? 1 : 53;
      }
    } else {
      weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
    // var onejan = new Date(this.getFullYear(), 0, 1);
    // var date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    // var dayOfYear = (date - onejan + 1) / 86400000;
    // return Math.ceil(dayOfYear / 7);
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  function printDate() {
    var dt = new Date();
    var date = dt.getDate();
    var month = monthNames[dt.getMonth()];
    var year = dt.getFullYear();
    var week = dt.getWeek();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();

    m = checkTime(m);
    s = checkTime(s);

    var time = h + ":" + m + ":" + s;

    let locationTime = document.querySelector(".location-time");
    let locationDate = document.querySelector(".location-date");
    let locationWeek = document.querySelector(".location-week");

    locationTime.textContent = time;
    locationDate.textContent = date + " " + month + " " + year;
    locationWeek.textContent = "v." + week;
  }

  printDate();

  setInterval(() => {
    printDate();
  }, 1000);
}
