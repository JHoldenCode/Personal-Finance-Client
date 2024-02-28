import React from 'react'
import './dashboard.css'
import Positions from '../positions/positions'
import Purchases from '../purchases/purchases'

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='purchases-section'>
        <Purchases />
      </div>
      <div className='holdings-section'>
        <Positions />
      </div>
    </div>
  )
}

export default Dashboard
