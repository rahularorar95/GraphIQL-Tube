const express = require('express');
var cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser');
var search = require('youtube-search-promise'); // for calling youtube search api 
const {
    graphqlExpress,
    graphiqlExpress
} = require('apollo-server-express'); //apollo helps to serve graphql over http on top of express
const {
    makeExecutableSchema
} = require('graphql-tools');

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors()) // will allow cross origin http request
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});

//queries that can be sent from client side
const typeDefs = `
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

//resolve the value of queries
const resolvers = {
    Query: {
        searchYoutubeVideos: (obj, args, context, info) => {
            return axios.get(`http://localhost:${PORT}/search?search_query=${args.searchFor}`)
                .then(response => response.data);
        }
    },
};

// structure 
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}));

// graphiql is web interface helps to directly run graphql queries
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));


// youtube search

var opts = {
  maxResults: 10,
  key: 'AIzaSyD_2YPJzm0wGeUuTULGpprgTwm_S2GUjQA',
  type: 'video',
  order: 'viewCount'
};

app.get('/search', (req, res) => {

    search(req.query.search_query, opts).then(results => {
        results.map((obj) => {
            obj.thumbnails = obj.thumbnails.medium.url
        })
        res.send(JSON.stringify(results));
    }).catch(error => {
        console.error(error);
    });
})


app.get('/',(req,res)=>{
    res.send("<p>Go to ->  <b>/graphiql</b> or</p><p>Go to ->  <b>/search?search_query='(any search term)'</b></p>")
})