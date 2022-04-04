
const mongoose = require('mongoose');



const usersFavouriteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true],
        unique: true,
        lowercase: true,
     
      },

    favoriteStations:{
        type:Array,
        required:false
      }



    })
    const UsersFavourite = mongoose.model('usersFavourite', usersFavouriteSchema);

    module.exports = UsersFavourite;