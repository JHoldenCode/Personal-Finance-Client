import React, { useState } from 'react';
import axios from 'axios';
import './postPositionsButton.css';

const postPositionsEndpoint = "http://localhost:5000/positions";

const PostPositionsButton = (props) => {
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
      // create JSON object as argument to POST request
      let ticker = postData.ticker;
      let postArgs = {
        "positions": {
            [ticker]: {
                shares: parseFloat(postData.shares),
                cost_basis: parseFloat(postData.costBasis)
            }
        }
      };
      // stock price is optional to submit
      if (postData.stockPrice.trim().length > 0) {
        postArgs.positions[ticker].price = parseFloat(postData.stockPrice);
      }

      // Make the POST request using axios
      const response = await axios.post(postPositionsEndpoint, postArgs);

      // reloads the table data after a successful post request
      await props.refetchTableData();

      // reset input fields after successful POST to database
      setPostData({
        ticker: '',
        stockPrice: '',
        shares: '',
        costBasis: '',
      });

      // Handle the response if needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  // TODO - make it so there is no up down arrows on input fields
      // TODO - use numeric, but must check in handleInputChange function to not allow rogue input
  // TODO - fix css of input fields and button
  // TODO - check if stock ticker is valid
  // TODO - make sure required fields are filled in

  return (
    <div className='post-positions-form'>
        <label>
        Stock Ticker:
        <input
          type="text"
          name="ticker"
          placeholder='i.e. AAPL'
          value={postData.ticker}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Stock Price (Optional):
        <input
          type="numeric"
          pattern="[0-9]*[.,]?[0-9]+"
          name="stockPrice"
          placeholder='i.e. 23.90'
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
          placeholder='i.e. 5.5'
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
          placeholder='i.e. 22.85'
          value={postData.costBasis}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleButtonClick}>Add New Holding</button>
    </div>
  );
};

export default PostPositionsButton;
