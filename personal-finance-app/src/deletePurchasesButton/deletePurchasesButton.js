import React from 'react';
import axios from 'axios';

const createDeleteJSONArg = (tableData, selectedRows) => {
    selectedRows.sort();
    let startRowOfDateDict = {};
    let deleteArgs = {
        purchases: {}
    };

    // loop through selected rows and add appropriate data to delete arguments
    for (let index in selectedRows) {
        let row = selectedRows[index];
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

        // add the index of the purchase to delete if only purchases from
        // that date were considered
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
            let deleteArgs = createDeleteJSONArg(props.tableData, props.selectedRows);

            // make the DELETE request using axios
            const response = await axios.delete('http://localhost:5000/money_spent', {
                data: deleteArgs,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // refetch the table data after a successful delete request
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