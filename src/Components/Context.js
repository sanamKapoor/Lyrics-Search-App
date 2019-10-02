import React, { Component } from 'react';
import axios from 'axios';

export const MyContext = React.createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'Search_Tracks':
    return{
      ...state,
      track_list: action.payload,
      heading: 'Search List'
    }
    default:
      return state;
  }
}


class Context extends Component {

  state = {
    track_list: [],
    track_no: 10,
    heading: 'Top 10 Tracks',
    api_key: '78e13b9d434a233740c481c6a342499a	',
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentDidMount(){
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=${this.state.track_no}&country=in&f_has_lyrics=1
    &apikey=${this.state.api_key}`)
      .then(res => {
        this.setState({
          track_list: res.data.message.body.track_list
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default Context
