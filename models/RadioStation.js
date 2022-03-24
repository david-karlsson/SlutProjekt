const mongoose = require('mongoose');

const radioStationSchema = new mongoose.Schema({
  
  StationId:{type:String},


  StationName:{type:String},
  

    UsersFavourited:{
        type: Array,
        required:false,
        min: 6,
        max: 50
    }
  
});

module.exports = mongoose.model('RadioStation', radioStationSchema);