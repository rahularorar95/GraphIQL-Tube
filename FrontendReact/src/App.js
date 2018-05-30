import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import ResultList from './ResultList'
import Header from './Header'

class App extends Component {

  state={
    videos:[],
    query:'',
    searching:false
  }
  searchYoutube=(input)=>{
    
    if(this.state.query.trim()===input.trim())return;
    this.setState({videos:[],searching:true})
    fetch(`http://localhost:3002/graphql?query={
      searchYoutubeVideos(searchFor:"${input}"){
        id
        link
        title
        thumbnails
        description
        publishedAt
      }
    }`).then(res => res.json())
    .then(json=>{
      const results=json.data.searchYoutubeVideos

      results.map((video)=>{
        var d = (new Date(video.publishedAt)).toDateString()
        video.publishedAt = d.slice(4,d.length)
        return video
      }
      )
      this.setState({videos:results, query:input,searching:false})
    }).catch(e =>{
      this.setState({videos:[], query:'',searching:false})
      alert('Connection refused')
    })
  
}
  render() {
    
    return (
      <div>
      <Header/>
      <Input onClickSearch={this.searchYoutube}/>
      <hr className="hr"/>
      <ResultList props={this.state}/>
      </div>
    );
  }
}

export default App;
