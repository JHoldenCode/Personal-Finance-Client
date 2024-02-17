import React from 'react';
import './dashboard.css';
import Holdings from '../holdings/holdings';
import Purchases from '../purchases/purchases';

function Dashboard() {
    return (
      <>
        <div className='purchases-section'>
          <Purchases />
        </div>
        <div className='holdings-section'>
          {/* <Holdings /> */}
        </div>
      </>
    )
}

export default Dashboard;
