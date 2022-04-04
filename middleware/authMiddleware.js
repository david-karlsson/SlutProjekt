const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const fetch = require('node-fetch')  
const RadioStation = require('../models/RadioStation');
// const { default: axios } = require('axios');
const {TempData} = require('../TempData')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'random secret message', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'random secret message', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;


     

       
      //   var options = {
      //     method: 'GET',
      //     url: "https://radio-browser.p.rapidapi.com/json/stations",
      //     params: {reverse: 'false', offset: '0', limit: '3', hidebroken: 'false'},
      //     headers: {
      //       'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      //       'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
      //     }}
            
      //  var data =   await axios.request(options)
       const statArr  = []




        let station1Db = await RadioStation.findOne({StationId: 1} )

        let station2Db = await RadioStation.findOne({StationId: 2} )
        
        let station3Db = await RadioStation.findOne({StationId: 3} )

        let station4Db = await RadioStation.findOne({StationId: 4} )

        let station5Db = await RadioStation.findOne({StationId: 5} )
        
        let station6Db = await RadioStation.findOne({StationId: 6} )


  


     if(user)  {

          


          // for (let index = 0; index < data.data.length ; index++) {
   
          //   statArr.push(await RadioStation.findOne({StationId:[index] }))
          // }
  
          // res.locals.statArrLocal = statArr.length




        
// for (let index = 0; index < statArr.length; index++) {
//   statNumbers.push(index)
  
// }



// statArr.forEach(element => {
  
//  statNumbers.push(element.StationName)

// });

          





      res.locals.stationsData = TempData()
// console.log(TempData(0))


                if(station1Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station1 = TempData()[0].name
                  res.locals.station1URL = TempData()[0].url

                }






                if(station2Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station2 = TempData()[1].name
                  res.locals.station2URL = TempData()[1].url

                }

           

          
                if(station3Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station3 = TempData()[2].name
                  res.locals.station3URL = TempData()[2].url
                }



                if(station4Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station3 = TempData()[3].name
                  res.locals.station3URL = TempData()[3].url
                }


                if(station5Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station3 = TempData()[4].name
                  res.locals.station3URL = TempData()[4].url

                }
                
                if(station6Db.UsersFavourited.includes(user.email)    ){

                  res.locals.station3 = TempData()[5].name
                  res.locals.station3URL = TempData()[5].url

                }
} 








//TODO fix crash on delete user when adding station to user that no longer exists:

      //  var strTemp = []
      //   fetch("http://localhost:3000/subscribe")
      //   .then((resF2) => {

      //     strTemp = resF2


      //   });
      //   console.log(strTemp) ;

        
  // console.log(stations)

        // res.locals.user.station = 1

        
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };
