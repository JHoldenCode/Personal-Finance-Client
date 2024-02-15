import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';

const holdingsEndpoint = "http://localhost:5000/holdings";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [compiledData, setCompiledData] = useState([]);

  useEffect(() => {
    axios.get(holdingsEndpoint)
      .then((response) => {
        let holdingsData = response.data.holdings;
        // console.log(response.data);
        let newData = [];

        // add the ticker for reach stock as a field in the object and push to tableData
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
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // console.log(compiledData);

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
    </div>
  );
}

export default Dashboard;
