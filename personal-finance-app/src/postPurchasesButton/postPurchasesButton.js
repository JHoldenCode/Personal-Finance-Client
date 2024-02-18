import React, { useState } from 'react';
import axios from 'axios';

const postPurchasesEndpoint = "http://localhost:5000/money_spent";

const PostPurchasesButton = (props) => {
    const [postData, setPostData] = useState({
        date: '',
        amount: '',
        item: '',
        category: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleButtonClick = async () => {
        try {
            // construct date string compatible with API mm/dd/yyyy
            let [year, month, day] = postData.date.split("-");

            // remove leading zeros from day and month
            day = String(parseInt(day));
            month = String(parseInt(month));

            let compatible_date = month + '/' + day + '/' + year;

            // create JSON object as argument to post request
            let postArgs = {
                "purchases": {
                    [compatible_date]: [{
                        amount: parseFloat(postData.amount),
                        item: postData.item,
                        category: postData.category
                    }]
                }
            };

            // make the POST request using axios
            const response = await axios.post(postPurchasesEndpoint, postArgs);

            // reloads the table data after a successful POST request
            props.refetchTableData();

            // handle the response if needed
            console.log("Response: ", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <label>
                Date:
                <input 
                    type="date"
                    name="date"
                    value={postData.date}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Amount:
                <input 
                    type="number"
                    name="amount"
                    value={postData.amount}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Item:
                <input
                    type="text"
                    name="item"
                    value={postData.item}
                    onChange={handleInputChange}
                 />
            </label>
            <br />
            <label>
                Category:
                <input
                    type="text"
                    name="category"
                    value={postData.category}
                    onChange={handleInputChange}
                 />
            </label>
            <br />
            <button onClick={handleButtonClick}>Add New Purchase</button>
        </div>
    )
};

export default PostPurchasesButton;