import React from 'react';
import axios from 'axios';

const clearAllPurchasesEndpoint = "http://localhost:5000/money_spent/clear_all";

const ClearAllPurchasesButton = (props) => {
    const handleButtonClick = async () => {
        // make the DELETE request using axios
        axios.delete(clearAllPurchasesEndpoint)
            .then((response) => {
                props.resetSelectedRows();
                props.refetchTableData();
                console.log("Response:", response);
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Delete All Purchases</button>
        </div>
    )
};

export default ClearAllPurchasesButton;