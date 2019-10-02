import React, { Component } from 'react';
import axios from 'axios';
import {MyContext} from './Context';

class Search extends Component {

  state = {
    trackName: '',
    api_key: '78e13b9d434a233740c481c6a342499a	'
  }

  formSubmit = (dispatch, e) => {
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackName}&page_size=10&page=5&s_track_rating=desc
    &apikey=${this.state.api_key}`)
      .then(res => {
        dispatch({
          type: 'Search_Tracks',
          payload: res.data.message.body.track_list
        })


        this.setState({
          trackName: ''
        })
      })
      .catch(err => console.log(err));
  }

  onchange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const { dispatch} = value
          return(
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For a Song
              </h1>
              <p className="lead text-center">
                Get Lyrics for any Song
              </p>

              <form onSubmit={this.formSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className="form-control"
                  placeholder="Song Title..."
                  name="trackName"
                  value={this.state.trackName}
                  onChange={this.onchange}
                  ></input>

                  <button className="btn btn-primary btn-block mt-2" type="submit">Get Lyrics</button>
                </div>

              </form>
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Search
