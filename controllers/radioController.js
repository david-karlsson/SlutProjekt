const RadioStation = require("../models/RadioStation");
// const express = require("express");
// const app = express();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const Cryptr = require('cryptr');
const UsersFavourite = require("../models/UsersFavorite");
const { default: axios } = require("axios");
const cryptr = new Cryptr(process.env.CK);

//Get pages to render


module.exports.radioStations_get = async (req, res) => {

  // const data = await axios.head('http://localhost:8080/output'
  // ,{
  // headers: { 'Content-Type': 'application/json' }}
  // )

  const token = req.cookies.jwt;
  // console.log(token)
  jwt.verify(token, 'random secret message', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.redirect('/login');
    } else {
      // console.log(decodedToken);
      let user = await User.findById(decodedToken.id);


      let usersFavourite = await UsersFavourite.findOne({ email: user.email });


      res.json(usersFavourite.favoriteStations)
      res.render('favorite');
    }
  });





}






module.exports.radioStationsSelection_get = async (req, res) => {






  res.render('radioStations')




}








//Methods


module.exports.radioAdd = async (req, res) => {

  const data = new RadioStation(req.body);
  var encryptedContent = cryptr.encrypt(req.body.StationName)


  data.StationName = encryptedContent

  data.save()
    .then(data => {
      console.log('Post saved', data);

    })
    .catch(err => {
      console.log(err);
    });



}




module.exports.selectFavoriteStation = async (req, res) => {



  const token = req.cookies.jwt;
  // console.log(token)
  jwt.verify(token, 'random secret message', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.redirect('/login');
    } else {
      // console.log(decodedToken);
      let user = await User.findById(decodedToken.id);
      res.locals.user = user;


// console.log(req.body.Search)

//       if(req.body.Search){


//         var options = {
//           method: 'GET',
//           url: 'https://radio-browser.p.rapidapi.com/json/stations/byname/'+ req.body.Search,
//           params: {reverse: 'false', offset: '0', limit: '10', hidebroken: 'false'},
//           headers: {
//             'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
//             'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
//           }
//         };
        
//       }

      
//         axios.request(options).then(function (response) {
       
//           response.data.forEach(element => {
        
        
//             res.locals.stSearch = element.name.concat(element.name)
//         });
//         }).catch(function (error) {
//           console.error(error);
//         });
  





      let data = await RadioStation.findOne({ StationId: req.body.Id })

      if (!(data.UsersFavourited.includes(user.email))) {



        let usersFavourite = await UsersFavourite.findOne({ email: user.email });

        if (!usersFavourite) {
          const data = new UsersFavourite(req.body);
          data.email = user.email;
          data.favoriteStations.push(req.body.Id)
          data.save();
          (sentdata => {
            console.log('New User-favorite ', sentdata);

          })
            .catch(err => {
              console.log(err);
            });

        }



        if (usersFavourite) {

          if(!usersFavourite.favoriteStations.includes(req.body.Id)){
          usersFavourite.favoriteStations.push(req.body.Id)
          usersFavourite.save().then
          
          (sentdata => {
            console.log('Existing User-favorite', sentdata);

          })
            .catch(err => {
              console.log(err);
            });

          }


        }


        data.UsersFavourited.push(user.email)

      }







      data.save()
        // .then(sentdata => {
        //   console.log('Post updated', sentdata);

        // })
        // .catch(err => {
        //   console.log(err);
        // });






    }



  })






}



