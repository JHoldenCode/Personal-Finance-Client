import React, { useState } from 'react';
import axios from 'axios';
import './postPurchasesButton.css'

const postPurchasesEndpoint = "http://localhost:5001/purchases";

const PostPurchasesButton = (props) => {
    const [postData, setPostData] = useState({
        date: '',
        amount: '',
        memo: '',
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
            let newPurchase = {
                date: postData.date,
                amount: postData.amount
            };
            // memo and category are optional fields, add them only if they have been input into the form
            if (postData.memo.trim().length > 0) {
                newPurchase['memo'] = postData.memo;
            }
            if (postData.category.trim().length > 0) {
                newPurchase['category'] = postData.category;
            }

            let postArgs = {
                "purchases": [newPurchase]
            };

            // make the POST request using axios
            const response = await axios.post(postPurchasesEndpoint, postArgs);

            // reloads the table data after a successful POST request
            await props.refetchTableData();

            // reset data in input boxes after a successful post
            setPostData({
                date: '',
                amount: '',
                memo: '',
                category: '',
            });

            // handle the response if needed
            console.log("Response: ", response.data);
        } catch (error) {
            console.error('Error posting new purchase to the database:', error);
        }
    };

    return (
        <div className='post-purchases-form'>
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
                    placeholder="i.e. 20.99"
                    value={postData.amount}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Memo (Optional):
                <input
                    type="text"
                    name="memo"
                    placeholder='i.e. Groceries'
                    value={postData.memo}
                    onChange={handleInputChange}
                 />
            </label>
            <br />
            <label>
                Category (Optional):
                <input
                    type="text"
                    name="category"
                    placeholder='i.e. Necessity'
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