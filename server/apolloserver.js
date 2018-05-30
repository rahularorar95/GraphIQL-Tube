const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
var search = require('youtube-search-promise');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const axios = require('axios')
const PORT= 3002
// Initialize the app
const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Start the server
app.listen(PORT, () => {
  console.log('Server Started');
});

var opts = {
  maxResults: 10,
  key: 'AIzaSyD_2YPJzm0wGeUuTULGpprgTwm_S2GUjQA',
type:'video',
order:'viewCount'
};

const typeDefs=`
    type Query {
        searchYoutubeVideos(searchFor:String):[Video]
    }

    type Video {
        id:String
        link:String
        publishedAt:String
        title:String
        description:String
        thumbnails : String
    }  
`;



const resolvers = {
  Query: { 
    searchYoutubeVideos: (obj, args, context, info) => {
    return axios.get(`http://localhost:${PORT}/search?search_query=${args.searchFor}`)
    .then(response=>response.data);
  } },
};


app.get('/search',(req,res)=>{
    
  search(req.query.search_query, opts ).then( results=> {
      results.map((obj)=>{
          obj.thumbnails= obj.thumbnails.medium.url
      })        
      res.send(JSON.stringify(results));
    }).catch(error => {
      console.error(error);
    });
})



const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
