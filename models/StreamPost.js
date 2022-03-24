const mongoose = require('mongoose');

const streamPostSchema = new mongoose.Schema({
  
  StreamId:
  {type:String

    },
  
    content: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }, 
    subscribedUsers:{
        type: Array,
        required:false,
        min: 6,
        max: 50
    }
  
});

module.exports = mongoose.model('StreamPost', streamPostSchema);