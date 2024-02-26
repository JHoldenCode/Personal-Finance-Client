import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostPositionsButton from '../postPositionsButton/postPositionsButton';
import DeletePositionsButton from '../deletePositionsButton/deletePositionsButton';
import ClearAllPositionsButton from '../clearAllPositionsButton/clearAllPositionsButton';
import './positions.css';

const positionsEndpoint = "http://localhost:5000/positions";

function Positions() {
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

  const resetSelectedRows = () => {
    setSelectedRows([]);
  };

  // returns a promise so that when called prior to resetSelectedRows, the old data is gone
  // before its checkbox is unchecked
  const fetchTableData = async () => {
    try {
      const response = await axios.get(positionsEndpoint);
      let positionsData = response.data.positions;
      let newData = [];

      // add the ticker for reach stock as a field in the object and push to newData
      for (let stockTicker in positionsData) {
        let positionsObj = positionsData[stockTicker];
        positionsObj.ticker = stockTicker;
        newData.push(positionsObj);
      }

      setTableData(newData);
      setCompiledData(response.data.compiled_stats);
    } catch (error) {
      console.error('Error fetching positions table data.', error);
      throw(error);
    }
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
      <div className='post-new-position'>
        <PostPositionsButton 
            refetchTableData={fetchTableData}
        />
      </div>
      <div className='delete-positions'>
        <DeletePositionsButton 
            selectedTickers={selectedRows}
            refetchTableData={fetchTableData}
            resetSelectedRows={resetSelectedRows}
        />
      </div>
      <div className='clear-all-positions'>
        <ClearAllPositionsButton 
          refetchTableData={fetchTableData}
          resetSelectedRows={resetSelectedRows}
        />
      </div>
    </div>
  );
}

// TODO - add prettier and linting in CI?
// TODO - fix rounding on compiled stats
// TODO - minify code

export default Positions;