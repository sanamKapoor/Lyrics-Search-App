 import React from 'react';
import {MyContext} from './Context';
import Spinner from './Spinner';
import SingleTrack from './SingleTrack';

function Tracks() {
  return (
    <MyContext.Consumer>
      { 
        value => {
          const { track_list, heading} = value
          if(track_list.length === 0 || track_list === undefined){
           return <Spinner />
          }
          else{
            return (
              <React.Fragment>
                <h3 className="text-center m-3">{heading}</h3>

                <div className="row">
                {
                  track_list.map(item => 
                    <SingleTrack key={item.track.track_id} track={item.track}/>
                  )
                }
                </div>
              </React.Fragment>
             
            )
          }
        }
      }
    </MyContext.Consumer>
  )
}

export default Tracks
