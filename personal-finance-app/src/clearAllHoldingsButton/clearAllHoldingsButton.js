import React from 'react';
import './clearAllHoldingsButton.css';
import axios from 'axios';

const ClearAllHoldingsButton = (props) => {
    const handleButtonClick = async () => {
        // make the delete request using axios
        axios.delete("http://localhost:5000/holdings/clear_all")
            .then((response) => {
                props.refetchTableData();
                console.log("Response: " + response);
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