import React from 'react';
import axios from 'axios';
import './clearAllPositionsButton.css';

const clearAllPositionsEndpoint = "http://localhost:5000/positions/clear_all";

const ClearAllPositionsButton = (props) => {
    const handleButtonClick = async () => {
        // make the delete request using axios
        try {
            const response = await axios.delete(clearAllPositionsEndpoint);

            await props.refetchTableData();
            props.resetSelectedRows();

            console.log('Response:', response);
        } catch (error) {
            console.error('Error deleting all positions from database:', error);
        }
    };

    return (
        <div className='clear-all-positions-button'>
            <button onClick={handleButtonClick}>Delete All Positions</button>
        </div>
    );
};

export default ClearAllPositionsButton;