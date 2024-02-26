import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostPurchasesButton from '../postPurchasesButton/postPurchasesButton';
import DeletePurchasesButton from '../deletePurchasesButton/deletePurchasesButton';
import ClearAllPurchasesButton from '../clearAllPurchasesButton/clearAllPurchasesButton';

const purchasesEndpoint = 'http://localhost:5001/purchases/all';

// TODO - add id for purchases instead of using row index
// TODO - implement other endpoints from /purchases somehow here

function Purchases() {
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (rowKey) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowKey)) {
                return prevSelectedRows.filter((selectedRow) => selectedRow !== rowKey);
            } else {
                return [...prevSelectedRows, rowKey];
            }
        });
    }

    const resetSelectedRows = () => {
        setSelectedRows([]);
    };

    // returns a promise so that when called prior to resetSelectedRows, the old data is gone
    // before its checkbox is unchecked
    const fetchTableData = async () => {
        try {
            const response = await axios.get(purchasesEndpoint);
            let purchasesData = response.data.purchases;
            let newData = [];

            // add data from GET request to tableData
            for (let index in purchasesData) {
                let purchase = purchasesData[index]
                newData.push(purchase)
            }

            setTableData(newData);
            return newData;
        } catch (error) {
            console.error('Error fetching purchases table data:', error);
            throw(error);
        }
    }; 

    useEffect(() => {
        fetchTableData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div>
            <div className='purchases-table'>
                <table>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Memo</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((val, _) => (
                            <tr key={val.id}>
                                <td>
                                    <input 
                                    type="checkbox"
                                    checked={selectedRows.includes(val.id)}
                                    onChange={() => handleCheckboxChange(val.id)}
                                    />
                                </td>
                                <td>{val.date}</td>
                                <td>{val.amount}</td>
                                <td>{val.memo}</td>
                                <td>{val.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='post-purchases-button'>
                <PostPurchasesButton 
                    refetchTableData={fetchTableData}
                />
            </div>
            <div className='delete-purchases-button'>
                <DeletePurchasesButton
                    selectedRows={selectedRows}
                    refetchTableData={fetchTableData}
                    resetSelectedRows={resetSelectedRows}
                />
            </div>
            <div className='clear-all-purchases'>
                <ClearAllPurchasesButton 
                    refetchTableData={fetchTableData}
                    resetSelectedRows={resetSelectedRows}
                />
            </div>
        </div>
    )
}

export default Purchases;