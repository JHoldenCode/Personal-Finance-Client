import React from 'react';
import axios from 'axios';
import './clearAllPurchasesButton.css';

const clearAllPurchasesEndpoint = "http://localhost:5001/purchases/clear_all";

const ClearAllPurchasesButton = (props) => {
    const handleButtonClick = async () => {
        // make the DELETE request using axios
        try {
            let response = await axios.delete(clearAllPurchasesEndpoint);

            // await on new table data first so you can not see both update steps happen
            await props.refetchTableData();
            props.resetSelectedRows();

            console.log("Response:", response);
        } catch (error) {
            console.error('Error deleting all purchases:', error);
        }
    }

    return (
        <div className='clear-all-purchases-button'>
            <button onClick={handleButtonClick}>Delete All Purchases</button>
        </div>
    )
};

export default ClearAllPurchasesButton;