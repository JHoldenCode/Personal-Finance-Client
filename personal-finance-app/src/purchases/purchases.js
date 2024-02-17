import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostPurchasesButton from '../postPurchasesButton/postPurchasesButton';

const moneySpentEndpoint = "http://localhost:5000/money_spent/all_purchases";

function Purchases() {
    const [tableData, setTableData] = useState([]);

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
                                    checked={false}
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
        </div>
    )
}

export default Purchases;