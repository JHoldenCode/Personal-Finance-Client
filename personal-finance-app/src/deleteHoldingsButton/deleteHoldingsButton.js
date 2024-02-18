import React from 'react';
import axios from 'axios';

const deleteHoldingsEndpoint = "http://localhost:5000/holdings";

const DeleteHoldingsButton = (props) => {
    const handleButtonClick = async () => {
        try {
            // create JSON obj for delete request
            let deleteArgs = {
                "holdings": props.selectedTickers
            };

            // make the DELETE request using axios
            const response = await axios.delete(deleteHoldingsEndpoint, {
                data: deleteArgs,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // reloads the table data after a successful delete request
            props.refetchTableData();

            // handle the response if needed
            console.log('Response: ', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Delete Selected Holdings</button>
        </div>
    )
};

export default DeleteHoldingsButton;
