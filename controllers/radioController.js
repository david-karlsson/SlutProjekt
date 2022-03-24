const RadioStation = require("../models/RadioStation");
// const express = require("express");
// const app = express();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CK);

//Get pages to render


module.exports.radioStations_get = async (req, res) => {



    res.render('favorite');
  }
  









  //Methods


  module.exports.radioAdd = async(req,res)=>{

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


  module.exports.radioStationsSelection_get = async(req, res) => {
  
  
  

  
  
    res.render('radioStations')




}
  


module.exports.selectFavoriteStation = async(req,res)=>{


 
    const token = req.cookies.jwt;
    console.log(token)
    jwt.verify(token, 'random secret message', async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.redirect('/login');
          } else {
            console.log(decodedToken);
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            console.log(user)   
     


     
            



let data = await RadioStation.findOne({StationId: req.body.Id} )

if(!(data.UsersFavourited.includes(user.email))){

  data.UsersFavourited.push(user.email)

}




    data.save()
    .then(data=> {
        console.log('Post updated', data);
      
    })
    .catch(err => {
        console.log(err);
    });

            




          }



    })

   


    

}



