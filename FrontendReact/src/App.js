import React, { Component } from 'react';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache
} from 'apollo-boost';

import gql from 'graphql-tag'
import './App.css';
import Input from './Input';
import ResultList from './ResultList'
import Header from './Header'

//const endpointURL = 'https://graphiql-server.herokuapp.com/graphql';
const endpointURL = 'http://localhost:5000/graphql';

//creating a apollo client
const client = new ApolloClient({
	link: new HttpLink({
		uri: endpointURL
	}),
	cache: new InMemoryCache()
});

class App extends Component {

	state = {
		videos: [],
		query: '',
		searching: false
	}
	searchYoutube = (input) => {

		if (this.state.query.trim() === input.trim()) return;
		this.setState({
			videos: [],
			searching: true
		})

		const query = gql `{
      searchYoutubeVideos(searchFor:"${input}"){
        id
        link
        title
        thumbnails
        description
        publishedAt
      }
    }`;

		client.query({
			query
		}).then(res => {

			const results = res.data.searchYoutubeVideos.map((video) => {
				let d = (new Date(video.publishedAt)).toDateString()
				return Object.assign({}, video, {
					publishedAt: d.slice(4, d.length)
				})
			})
			this.setState({
				videos: results,
				query: input,
				searching: false
			})
		})


		/* //without apollo client 
    fetch(`${endpointURL}?query={
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

*/

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