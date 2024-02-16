import React, { useState } from 'react';
import axios from 'axios';

const PostHoldingsButton = (props) => {
  const [postData, setPostData] = useState({
    ticker: '',
    stockPrice: '',
    shares: '',
    costBasis: '',
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
      // create JSON object as argument to post request
      let ticker = postData.ticker;
      let postArgs = {
        "holdings": {
            [ticker]: {
                shares: parseFloat(postData.shares),
                cost_basis: parseFloat(postData.costBasis)
            }
        }
      };
      // stock price is optional to submit
      if (postData.stockPrice.length > 0) {
        postArgs.holdings[ticker].price = parseFloat(postData.stockPrice);
      }

      // Make the POST request using axios
      const response = await axios.post('http://localhost:5000/holdings', postArgs);

      // reloads the table data after a successful post request
      props.refetchTableData();

      // Handle the response if needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  // TODO - make it so there is no up down arrows on input fields
  // TODO - fix css of input fields and button
  // TODO - update table automatically when new post
  // TODO - check if stock ticker is valid

  return (
    <div>
        <label>
        Stock Ticker:
        <input
          type="text"
          name="ticker"
          value={postData.ticker}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Stock Price (Optional):
        <input
          type="number"
          name="stockPrice"
          value={postData.stockPrice}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Shares:
        <input
          type="number"
          name="shares"
          value={postData.shares}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Cost Basis:
        <input
          type="number"
          name="costBasis"
          value={postData.costBasis}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleButtonClick}>Add New Holding</button>
    </div>
  );
};

export default PostHoldingsButton;
