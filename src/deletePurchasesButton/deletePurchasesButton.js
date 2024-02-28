import React from 'react'
import axios from 'axios'
import './deletePurchasesButton.css'

const deletePurchasesEndpoint = 'http://localhost:5001/purchases'

// TODO - maybe make separate styling file for tables and buttons

const DeletePurchasesButton = (props) => {
  const handleButtonClick = async () => {
    try {
      // create JSON obj for delete request
      let deleteArgs = {
        purchases: props.selectedRows,
      }

      // make the DELETE request using axios
      const response = await axios.delete(deletePurchasesEndpoint, {
        data: deleteArgs,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // await on new table data first so you can not see both update steps happen
      await props.refetchTableData()
      props.resetSelectedRows()

      // handle the response if needed
      console.log('Response: ', response.data)
    } catch (error) {
      console.error('Error deleting selected purchases:', error)
    }
  }

  return (
    <div className='delete-purchases-button'>
      <button onClick={handleButtonClick}>Delete Selected Purchases</button>
    </div>
  )
}

export default DeletePurchasesButton
