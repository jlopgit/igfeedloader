import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends React.Component{

 constructor(props){
   super(props);
   this.state = {feedData : []};
 }

 componentDidMount(){

  try{
    axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,permalink,media_url&access_token=${process.env.REACT_APP_IG_TOKEN}`)
          .then((resp) => {
            this.setState({feedData : resp.data.data});
          }, (err) => {console.log("Something went wrong with GET", err)});
  }
  catch(err){

    console.log("Something went wrong with axios", err);
  }
 }

 componentDidUpdate(){

   this.createTiles();
 }

 createTiles = () =>{
   let text = "";
   const feed = document.createElement("div");
   feed.setAttribute("class", "feed");

   for(let i in this.state.feedData){

     let tile = document.createElement("div");
     tile.setAttribute("class", "tile");

     let content = document.createElement("a");
     content.setAttribute("class", "content");
     content.setAttribute("href", this.state.feedData[i].permalink);
     content.setAttribute("target", "_blank");

     if(this.state.feedData[i].media_type == "VIDEO"){

       let video = document.createElement("video");
       video.setAttribute("src", this.state.feedData[i].media_url);
       video.setAttribute("controls", "true");
       content.appendChild(video);
     }
     else{
       let image = document.createElement("img");
       image.setAttribute("src", this.state.feedData[i].media_url);
       content.appendChild(image);
     }

     tile.appendChild(content);
     feed.appendChild(tile);
   }

  document.getElementById("media").appendChild(feed);
 }

 render(){

    return(
      <div className = "body" id = "media">
      </div>

    );
  }
}

export default App;
