import React, {
	Component
} from 'react';

class ResultList extends Component {

	render() {
		const videos = this.props.props.videos;
		const query = this.props.props.query;
		const searching = this.props.props.searching;
		return (

			<div className="container">
          <div className="box-collection">
         
          {
            (videos.length!==0 && (
              <div>
              <p className="no-results2">Popular in "{query}"</p>
              <ul className="column">
              {
                  videos.map((video)=>(
                    <a href={video.link} target="_blank" key={video.id}>
                    <li className="box4">
                    <img className="image" src={video.thumbnails} alt={video.title}/>
                    <div className="title">{video.title}</div>  
                        <p className="video-description">
                          {video.description}
                        </p>
                        <p className="timestamp">
                          {video.publishedAt}
                        </p>
                    </li>
                    </a>
                  ))
              }        
              </ul>
              </div>
            ))
          }         
          {
            (videos.length===0 && !searching && (
              <p className="no-results">
                No results to show...
              </p>
            ))
          }
          {
             (searching && (
              <p className="no-results">
                Loading...
              </p>
              )
            )
          }
        </div>
        </div>
		)
	}
}

export default ResultList;