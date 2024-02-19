import React from 'react';
import './dashboard.css';
import Holdings from '../holdings/holdings';
import Purchases from '../purchases/purchases';

function Dashboard() {
    return (
      <div className='dashboard'>
        <div className='purchases-section'>
          <Purchases />
        </div>
        <div className='holdings-section'>
          <Holdings />
        </div>
      </div>
    )
}

export default Dashboard;
