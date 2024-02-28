import React, { useState, useEffect } from "react";
import axios from "axios";
import PostPositionsButton from "../postPositionsButton/postPositionsButton";
import DeletePositionsButton from "../deletePositionsButton/deletePositionsButton";
import ClearAllPositionsButton from "../clearAllPositionsButton/clearAllPositionsButton";
import "./positions.css";

const positionsEndpoint = "http://localhost:5000/positions";

function roundToTwoDecimalPlaces(val) {
  return Math.round(val * 100) / 100;
}

let lk = "cat";
if ("cat" == lk) {
  console.log("c");
}

if ("dog" == ggg) {
  console.log('doggy');
}

function Positions() {
  const [tableData, setTableData] = useState([]);
  const [compiledData, setCompiledData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // removes or adds a row index to selectedRows
  const handleCheckboxChange = (ticker) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(ticker)) {
        return prevSelectedRows.filter(
          (selectedTicker) => selectedTicker !== ticker,
        );
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

        // round all values to 2 decimal places
        for (let key in positionsObj) {
          positionsObj[key] = roundToTwoDecimalPlaces(positionsObj[key]);
        }

        positionsObj.ticker = stockTicker;
        newData.push(positionsObj);
      }

      // round compiled data
      let compiledDataResponse = response.data.compiled_stats;
      for (let key in compiledDataResponse) {
        compiledDataResponse[key] = roundToTwoDecimalPlaces(
          compiledDataResponse[key],
        );
      }

      setTableData(newData);
      setCompiledData(compiledDataResponse);
    } catch (error) {
      console.error("Error fetching positions table data.", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="positions-div">
      <div className="positions-header">
        <div className="left-header">
          <h1>POSITIONS</h1>
          <DeletePositionsButton
            selectedTickers={selectedRows}
            refetchTableData={fetchTableData}
            resetSelectedRows={resetSelectedRows}
          />
          <ClearAllPositionsButton
            refetchTableData={fetchTableData}
            resetSelectedRows={resetSelectedRows}
          />
          <div className="compiled-stock-results">
            <div className="compiled-line">
              <label>Total Equity:</label>
              <span>{compiledData.total_equity}</span>
            </div>
            <div className="compiled-line">
              <label>Total Dollar Gain:</label>
              <span>{compiledData.total_dollar_gain}</span>
            </div>
            <div className="compiled-line">
              <label>Total Percent Gain:</label>
              <span>{compiledData.total_percent_gain}</span>
            </div>
          </div>
        </div>
        <div className="right-header">
          <PostPositionsButton refetchTableData={fetchTableData} />
        </div>
      </div>
      <div className="positions-table">
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
    </div>
  );
}

// TODO - add prettier and linting in CI?
// TODO - minify code

export default Positions;
