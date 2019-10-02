import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Spinner from './Spinner';
import Moment from 'react-moment';

class Lyrics extends Component {

  state = {
    track : {},
    lyrics: {},
    api_key: '78e13b9d434a233740c481c6a342499a'
  }

  componentDidMount(){
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${this.state.api_key}`)
      .then(res => {
        this.setState({
          lyrics: res.data.message.body.lyrics
        });


        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${this.state.api_key}`)
      })
      .then(res => {
        this.setState({
          track: res.data.message.body.track
        });
        console.log(res.data.message.body.track);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics} = this.state;

    if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
        return <Spinner />
    } 
    else{
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>

          <div className="card">
            <h5 className="card-header">
              {track.track_name} by 
               <span className="text-muted">{track.artist_name}</span>
            </h5>

            <div className="card-body">
            <p className="card-text">
             {lyrics.lyrics_body}
            </p>
            </div>

          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album Name</strong>:
               {track.album_name}
            </li>
            
            <li className="list-group-item">
              <strong>Release Date</strong>: <Moment format="MM/DD/YY">
              {track.first_release_date}
              </Moment>
            </li>
          </ul>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics
