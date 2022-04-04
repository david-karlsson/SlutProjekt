

<template>
<div>



<div v-if="langSwitch == 0">
{{GetLanguages()}}
</div>


<div v-if="favSwitch == 0">
{{getFavorites()}}
</div>

<section>



<button @click="ChannelGet()">Music, please</button>

<div class="ui-segment">
<input type="text"  v-model="searchQuery" id="search-bar">
<button @click="ChannelSearch()">Search</button>

</div>
<span class="ui-segment">
<label for="lang">Languages:</label>

<select @Change = LangSearch() name="lang" class="lang-box" v-model="currentLanguage">

<option   v-for="item in languages " class="item-style"  :key=item>



{{item.name}}
||   Stations:
{{item.stationcount}}
</option>
</select>

</span>


</section>

<main>

<span class="box ui-segment" >
<p v-for="item in channels " class="item-style" :key = item >
<a :href= item.homepage >
<img v-if = "item.favicon !== ''"  :src = item.favicon  />
</a>
<audio controls :id=item.name   class="audio-elem" >

<source  :src=item.url_resolved type="audio/ogg">
<source :src=item.url_resolved type="audio/mpeg">
Your browser does not support the audio element.
</audio>

<button @Click= mutePage()> Mute all channels</button>

<a :href= item.homepage >

<p>{{item.name}}</p>
<p>  <small><em>{{item.country}}</em>  </small></p>

</a>

</p>





</span>

</main>

</div>
</template>

<script>
import axios from 'axios'
import {authHeader} from './authHeader'

export default {
 
 
 name: 'App',

data(){

return{

    channels:[],
    searchQuery:'Eng',
    languages:[],
    langSwitch:0,
    currentLanguage:'',
    audioElements:[],
    favorites:[],
    favSwitch:0,
    API_URL: 'http://localhost:8080/',
    authHeader: authHeader

}


}
,
   
methods:{
ChannelGet(){
 
 
  this.audioElements.forEach(element => {
    console.log(element)
  });
 
var options = {
  method: 'GET',
  url: 'https://radio-browser.p.rapidapi.com/json/stations',
  params: {reverse: 'false', offset: '0', limit: '10', hidebroken: 'true'},
  headers: {
    'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
    'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
  }
};
var This= this;
this.channels.splice(0,999);

axios.request(options).then(function (response) {
	console.log(response.data);

  response.data.forEach(element => {
    This.channels.unshift(element)
    This.audioElements.push(element.url)
    
});
    // This.channels =response.data.name
    console.log(This.audioElements[0])
}).catch(function (error) {
	console.error(error);
});



},



ChannelSearch(){

  var SearchBarQuery = document.getElementById("search-bar").value

  var options = {
    method: 'GET',
    url: 'https://radio-browser.p.rapidapi.com/json/stations/byname/'+ SearchBarQuery,
    params: {reverse: 'false', offset: '0', limit: '100000', hidebroken: 'true'},
    headers: {
      'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
    }
  };
  var This= this;
  this.channels.splice(0,999);

  axios.request(options).then(function (response) {
    This.searchQuery = 
    console.log(response.data);
    response.data.forEach(element => {
      This.channels.unshift(element)
  
      console.log(element.name)
  });
  }).catch(function (error) {
    console.error(error);
  });



},


GetLanguages(){

  
var options = {
  method: 'GET',
  url: 'https://radio-browser.p.rapidapi.com/json/languages',
  headers: {
    'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
    'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
  }
};
var This= this;
this.channels.splice(0,999);

axios.request(options).then(function (response) {
  response.data.forEach(element => {
    This.languages.push(element)

    // console.log(element.name)
});
}).catch(function (error) {
	console.error(error);
});

this.langSwitch = 1


},

LangSearch(){
var selectBar = document.getElementsByName("lang")[0].value.slice(0,3)
  console.log(selectBar)


  var options = {
    method: 'GET',
    url: 'https://radio-browser.p.rapidapi.com/json/stations/search' ,
    params: {
      language: selectBar,
      reverse: 'false',
      offset: '0',
      limit: '10',
      hidebroken: 'true'
    },
    headers: {
      'x-rapidapi-host': 'radio-browser.p.rapidapi.com',
      'x-rapidapi-key': 'ad3c92741dmshe1e30f51eb1488dp1b285djsn2780563b1f51'
    }
  };
  var This =this
  this.channels.splice(0,999);

  axios.request(options).then(function (response) {
    response.data.forEach(element => {

      This.channels.unshift(element)
  
      console.log(element.name)
  });
  }).catch(function (error) {
    console.error(error);
  });

this.getFrontEnd(this.channels)


},
// Mute a singular HTML5 element
muteMe() {
  // elem.muted = true;
 var audioCollect= document.getElementsByClassName("audio-elem");

// el.forEach(item=> item.pause())
 
//  el[0].pause()
 for (let i = 0; i < audioCollect.length; i++) {
  audioCollect[i].pause();
}


  // console.log("mute:" +elem)

},

// Try to mute all video and audio elements on the page
 mutePage() {
 this.audioElements.forEach(elem => {this.muteMe(elem)


} );
},


getFavorites(){




  var options = {
    method: 'GET',
    url: 'http://localhost:3000/favorite',     
     jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjg3YzM4MDNhNTZiNGZhNDM5MmVjZCIsImlhdCI6MTY0ODY0MzU2NiwiZXhwIjoxNjQ4OTAyNzY2fQ.mzH8RasgEJb70TYizOWKdosBD8XBwD3eEMHMEnJ6HBc',

  headers: authHeader() 


  };

  
  axios.request(options).then( response => {
  
  console.log(response)
  // response.forEach(element => {
  //     this.favorites.push(element)
  
  //     // console.log(element.name)
  // });
  }).catch( error => {
    console.error(error);
  });
  
this.favSwitch = 1


return axios.post(this.API_URL, { headers: authHeader() });



// fetch(
  
//   {   method: 'GET',
//   URL: 'http://localhost:3000/favorite'
// })
//   .then((res) => {
//     this.favorites = res;
//   });





},

getFrontEnd(apidata){

return axios.get(this.API_URL+'/output', { headers: authHeader(apidata)});

}



}


}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-image:url(https://images.unsplash.com/photo-1633294666093-ab54f43a947a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80) ;
    background-size: contain;
  }


  h1,h2,h3{

    color:lightsalmon;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bold;
  }

  a{
    color: lightseagreen;
    text-decoration: none;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }

  p{
    padding: 0.5rem;
  }

  em{
    color: seagreen;
  }
  



  #RadioComp,main,section {

  padding: 1rem;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(1, 2, 3, 0.5);
  }
  
  .box{
    display: flex;
    flex-wrap: wrap;
  }
  h1,
  h3 {
    margin-bottom: 1rem;
    font-weight: normal;
  }
  
  img {
    border-radius: 50%;
    border: 5px #333 solid;
    margin-bottom: 1rem;
  }
  
  

  .item-style{
    border: 1px solid lightcoral;
    margin:1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
   flex-wrap: wrap;
  }

  .item-style img{
    max-width: 10vw;
  }

button{    
  background: #333;
  color: white;

}
select,input{
  background-color: burlywood;
 
}

  button,select,input {
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    border: 0;
    padding: 1rem 1.5rem;
    margin: 1rem;
    border: 1px solid goldenrod;
  }
  
  button:focus {
    outline: none;
  }
  
  button:hover {
    transform: scale(0.98);
  }
  
  .ui-segment{

    padding: 1rem;
    margin: 1rem;
    background-color: rgba(28, 56, 83, 0.8);
    border-radius: 0.5rem;
  }

  .lang-box{
    display: flex;
flex-wrap: wrap;
    color: brown;

  }

  label{

    color: goldenrod;
    padding: 1rem;
  }
</style>
