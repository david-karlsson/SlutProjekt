const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const fetch = require('node-fetch')  
const RadioStation = require('../models/RadioStation');

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



        let station1 = await RadioStation.findOne({StationId: 1} )

        let station2 = await RadioStation.findOne({StationId: 2} )
        
        let station3 = await RadioStation.findOne({StationId: 3} )




     if(user)  {


                if(station1.UsersFavourited.includes(user.email)    ){

                  res.locals.station1 = station1.StationId 

                }






                if(station2.UsersFavourited.includes(user.email)    ){

                  res.locals.station2 = station2.StationId 

                }

           

              if(station3){
                if(station3.UsersFavourited.includes(user.email)    ){

                  res.locals.station3 = station3.StationId 

                }
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
