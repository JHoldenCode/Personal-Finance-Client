import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostPurchasesButton from '../postPurchasesButton/postPurchasesButton';
import DeletePurchasesButton from '../deletePurchasesButton/deletePurchasesButton';
import ClearAllPurchasesButton from '../clearAllPurchasesButton/clearAllPurchasesButton';

const moneySpentEndpoint = "http://localhost:5001/money_spent/all_purchases";

// TODO - add id for purchases instead of using row index
// TODO - implement other endpoints from /money_spent somehow here

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

    const fetchTableData = async () => {
        axios.get(moneySpentEndpoint)
            .then((response) => {
                let purchasesData = response.data.purchases;
                let newData = [];

                // add data from GET request to tableData
                for (let year in purchasesData) {
                    let yearData = purchasesData[year];
                    for (let month in yearData) {
                        let monthData = yearData[month];
                        for (let date in monthData) {
                            let purchases = monthData[date];
                            for (let index in purchases) {
                                // add date field into purchase object
                                let purchaseObj = purchases[index];
                                purchaseObj.date = date;
                                newData.push(purchaseObj);
                            }
                        }
                    }
                }

                setTableData(newData);
            })
            .catch((error) => {
                console.log(error);
            });
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
                            <th>Item</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((val, key) => (
                            <tr key={key}>
                                <td>
                                    <input 
                                    type="checkbox"
                                    checked={selectedRows.includes(key)}
                                    onChange={() => handleCheckboxChange(key)}
                                    />
                                </td>
                                <td>{val.date}</td>
                                <td>{val.amount}</td>
                                <td>{val.item}</td>
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
                    tableData={tableData}
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