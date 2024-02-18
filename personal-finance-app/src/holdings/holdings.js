import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostHoldingsButton from '../postHoldingsButton/postHoldingsButton';
import DeleteHoldingsButton from '../deleteHoldingsButton/deleteHoldingsButton';
import ClearAllHoldingsButton from '../clearAllHoldingsButton/clearAllHoldingsButton';
import './holdings.css';

const holdingsEndpoint = "http://localhost:5000/holdings";

function Holdings() {
  const [tableData, setTableData] = useState([]);
  const [compiledData, setCompiledData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // removes or adds a row index to selectedRows
  const handleCheckboxChange = (ticker) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(ticker)) {
        return prevSelectedRows.filter((selectedTicker) => selectedTicker !== ticker);
      } else {
        return [...prevSelectedRows, ticker];
      }
    });
  };

  const fetchTableData = async () => {
    axios.get(holdingsEndpoint)
      .then((response) => {
        let holdingsData = response.data.holdings;
        let newData = [];

        // add the ticker for reach stock as a field in the object and push to newData
        for (let stockTicker in holdingsData) {
          let holdingsObj = holdingsData[stockTicker];
          holdingsObj.ticker = stockTicker;
          newData.push(holdingsObj);
        }

        setTableData(newData);
        setCompiledData(response.data.compiled_stats);
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
      <div className="compiled-stock-results">
        <div>
          <label>Total Equity</label>
          <span>{compiledData.total_equity}</span>
        </div>
        <div>
          <label>Total Dollar Gain</label>
          <span>{compiledData.total_dollar_gain}</span>
        </div>
        <div>
          <label>Total Percent Gain</label>
          <span>{compiledData.total_percent_gain}</span>
        </div>
      </div>
      <div className="stock-table">
        <table>
          <thead>
            <tr>
              <th>X</th>
              <th>Stock</th>
              <th>Equity</th>
              <th>Stock Price</th>
              <th>Shares</th>
              <th>Cost Basis</th>
              <th>% Gain</th>
              <th> $ Gain</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((val, key) => (
              <tr key={key}>
                <td>
                    <input
                    type="checkbox"
                    checked={selectedRows.includes(val.ticker)}
                    onChange={() => handleCheckboxChange(val.ticker)}
                    />
                </td>
                <td>{val.ticker}</td>
                <td>{val.equity}</td>
                <td>{val.price}</td>
                <td>{val.shares}</td>
                <td>{val.cost_basis}</td>
                <td>{val.percent_gain}</td>
                <td>{val.dollar_gain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='post-new-holding'>
        <PostHoldingsButton 
            refetchTableData={fetchTableData}
        />
      </div>
      <div className='delete-holdings'>
        <DeleteHoldingsButton 
            selectedTickers={selectedRows}
            refetchTableData={fetchTableData}
        />
      </div>
      <div className='clear-all-holdings'>
        <ClearAllHoldingsButton 
          refetchTableData={fetchTableData}
        />
      </div>
    </div>
  );
}

// TODO - add prettier and linting in CI?
// TODO - fix rounding on compiled stats
// TODO - minify code

export default Holdings;
