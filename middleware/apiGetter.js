const  axios = require("axios");

const  apiFetch = async(req, res, next)=>{


       
  var options = {
    method: 'GET',
    url: "https://radio-browser.p.rapidapi.com/json/stations",
    params: {reverse: 'false', offset: '0', limit: '10', hidebroken: 'false'},
    headers: {
      'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
    }}
      
 var data =   await axios.request(options)

 

  res.locals.stationName0 = data.data[0].name
  res.locals.stationName1 = data.data[1].name
  res.locals.stationName2 = data.data[2].name


  
console.log(data)

next();
  
}

module.exports ={apiFetch}