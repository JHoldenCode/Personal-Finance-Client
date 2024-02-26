import React from "react";
import axios from "axios";
import "./deletePositionsButton.css";

const deletePositionsEndpoint = "http://localhost:5000/positions";

const DeletePositionsButton = (props) => {
  const handleButtonClick = async () => {
    try {
      // create JSON obj for delete request
      let deleteArgs = {
        positions: props.selectedTickers,
      };

      // make the DELETE request using axios
      const response = await axios.delete(deletePositionsEndpoint, {
        data: deleteArgs,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // reloads the table data after a successful delete request
      await props.refetchTableData();
      props.resetSelectedRows();

      // handle the response if needed
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Error deleting selected positions:", error);
    }
  };

  return (
    <div className="delete-positions-button">
      <button onClick={handleButtonClick}>Delete Selected Positions</button>
    </div>
  );
};

export default DeletePositionsButton;
