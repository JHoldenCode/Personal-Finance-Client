import React from 'react';
import axios from 'axios';

const deletePurchasesEndpoint = "http://localhost:5001/money_spent";

// creates the object used as an argument to the DELETE request
const createDeleteRequestObj = (tableData, selectedRows) => {
    // dictionary to cache the start row of purchase dates
    let startRowOfDateDict = {};

    // object that will be constructed and returned
    let deleteArgs = {
        purchases: {}
    };

    // add the index of each purchase to deleteArgs (only in reference to other purchases made on same date)
    for (let i = 0; i < selectedRows.length; i++) {
        let row = selectedRows[i];
        let rowData = tableData[row];
        let rowDate = rowData.date;
        
        // figure out which row of the table is the first with this date
        if (!(rowDate in startRowOfDateDict)) {
            let tempRow = row-1;
            while (tempRow >= 0 && tableData[tempRow].date === rowDate) {
                tempRow--;
            }
            startRowOfDateDict[rowDate] = tempRow+1;
        }

        let startRow = startRowOfDateDict[rowDate];

        // add modified index of purchase to array of purchases to delete on that date
        if (rowDate in deleteArgs.purchases) {
            deleteArgs.purchases[rowDate].push(row - startRow);
        } else {
            deleteArgs.purchases[rowDate] = [row - startRow];
        }
    }

    return deleteArgs;
};

const DeletePurchasesButton = (props) => {
    const handleButtonClick = async () => {
        try {
            // create JSON obj for delete request
            let deleteArgs = createDeleteRequestObj(props.tableData, props.selectedRows);

            // make the DELETE request using axios
            const response = await axios.delete(deletePurchasesEndpoint, {
                data: deleteArgs,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            props.resetSelectedRows();
            props.refetchTableData();

            // handle the response if needed
            console.log('Response: ', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Delete Selected Purchases</button>
        </div>
    )
};

export default DeletePurchasesButton;