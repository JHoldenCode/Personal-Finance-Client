import React from 'react';
import axios from 'axios';

const clearAllHoldingsEndpoint = "http://localhost:5000/holdings/clear_all";

const ClearAllHoldingsButton = (props) => {
    const handleButtonClick = async () => {
        // make the delete request using axios
        axios.delete(clearAllHoldingsEndpoint)
            .then((response) => {
                props.refetchTableData();
                console.log("Response: ", response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Delete All Holdings</button>
        </div>
    );
};

export default ClearAllHoldingsButton;