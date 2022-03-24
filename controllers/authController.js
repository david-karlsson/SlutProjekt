const User = require("../models/User");
const jwt = require('jsonwebtoken');
const StreamPost = require("../models/StreamPost")

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'random secret message', {
    expiresIn: maxAge
  });
};

// controller actions


//Get pages to render


module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.delete_page_get = (req, res) => {
  res.render('delete');
}






//Functions to  exec.





module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });



    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;



  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id });



  
  



  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }





}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}



module.exports.delete_user =  async(req,res) =>{


    // const { email, password } = req.body;

  

      // User.deleteOne({
      //   email: user.email,
      //   password:user.password
      
      // })

    //   const token = createToken(user._id);
    //   res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    //   res.status(200).json({ 
    //     user: user._id
    //   });



    // }   
    
    // catch (err) {
    //   const errors = handleErrors(err);
    //   res.status(400).json({ errors });
    // }
    const token = req.cookies.jwt;

    jwt.verify(token, 'random secret message', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;

      } else {
        let user = await User.findById(decodedToken.id);
        // console.log(user)






        let streams1 = await StreamPost.findOne({StreamId: 1} )

        let streams2 = await StreamPost.findOne({StreamId: 2} )
        
        let streams3 = await StreamPost.findOne({StreamId: 3} )








deleteStreamSub =(streamNr)=>{

  var tempSubs = streamNr.subscribedUsers



  var nr= tempSubs.indexOf(user.email)
  
  tempSubs.splice(nr)
  
  streamNr.subscribedUsers = tempSubs
  
  streamNr.save()

}





if(streams1.subscribedUsers.includes(user.email)    ){


deleteStreamSub(streams1)


}



if(streams2.subscribedUsers.includes(user.email)    ){
  deleteStreamSub(streams2)


}




if(streams3.subscribedUsers.includes(user.email)    ){

  deleteStreamSub(streams3)

}


        await User.deleteOne({email:user.email, password:user.password});
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
      }

    })
}
