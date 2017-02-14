import React, { Component } from 'react';
import HomeBanner from './home/HomeBanner.jsx';
import HomeEntitiesTable from './home/HomeEntitiesTable.jsx';

class HomePage extends Component {  
  render() {
    return (
      <div>
      	<HomeBanner />
      	<HomeEntitiesTable />
      </div>
    );
  }
}

export default HomePage;  
