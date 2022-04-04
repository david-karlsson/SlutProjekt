const  axios = require("axios");
const {  checkUser } = require('./authMiddleware');
const RadioStation = require('../models/RadioStation');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const  apiFetch = async(req, res, next)=>{
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'random secret message', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;


     


        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
       
  var options = {
    method: 'GET',
    url: "https://radio-browser.p.rapidapi.com/json/stations",
    params: {reverse: 'false', offset: '0', limit: '10', hidebroken: 'false'},
    headers: {
      'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
    }}
      
 var data =   await axios.request(options)
var i = []

  res.locals.stationName = data.data



       
  var options = {
    method: 'GET',
    url: "https://radio-browser.p.rapidapi.com/json/stations",
    params: {reverse: 'false', offset: '0', limit: '10', hidebroken: 'false'},
    headers: {
      'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
    }}
      
 var data =   await axios.request(options)

 const statArr  = []
 var statNumbers = []




  let station1 = await RadioStation.findOne({StationId: 1} )

  let station2 = await RadioStation.findOne({StationId: 2} )
  
  let station3 = await RadioStation.findOne({StationId: 3} )

  let station4 = await RadioStation.findOne({StationId: 4} )

  let station5 = await RadioStation.findOne({StationId: 5} )
  
  let station6 = await RadioStation.findOne({StationId: 6} )





if(user)  {

    


    for (let index = 0; index < data.data.length ; index++) {

      statArr.push(await RadioStation.findOne({StationId:[index] }))
    }

    res.locals.statArrLocal = statArr.length




  
for (let index = 0; index < statArr.length; index++) {
statNumbers.push(index)

}



// statArr.forEach(element => {

//  statNumbers.push(element.StationName)

// });

    

console.log(statNumbers)






          if(station1.UsersFavourited.includes(user.email)    ){

            res.locals.station1 = data.data[0].name 
            res.locals.station1URL = data.data[0].url_resolved 

          }




          if(station2.UsersFavourited.includes(user.email)    ){

            res.locals.station2 = data.data[1].name 
            res.locals.station2URL = data.data[1].url_resolved 
          }

     

    
          if(station3.UsersFavourited.includes(user.email)    ){

            res.locals.station3 = data.data[2].name 
            res.locals.station3URL = data.data[2].url_resolved 
          }



          if(station4.UsersFavourited.includes(user.email)    ){

            res.locals.station4 = data.data[3].name 
            res.locals.station4URL = data.data[3].url_resolved 
          }


          if(station5.UsersFavourited.includes(user.email)    ){

            res.locals.station5 = data.data[4].name 
            res.locals.station5URL = data.data[4].url_resolved 
          }
          
          if(station6.UsersFavourited.includes(user.email)    ){

            res.locals.station6 = data.data[5].name 
            res.locals.station6URL = data.data[5].url_resolved 
          }
} 







next();
  
}

module.exports ={apiFetch}