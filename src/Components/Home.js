import React from 'react'
import Tracks from './Tracks';
import Search from './Search';

function Home() {
  return (
   <React.Fragment>
     <Search />
     <Tracks />
   </React.Fragment>
  )
}

export default Home
