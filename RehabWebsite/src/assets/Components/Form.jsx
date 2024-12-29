import React, { useState } from "react";
import styled from "styled-components";

const Form = () => {
  const [selectedGame, setSelectedGame] = useState(""); // State to hold the selected game

  const handleGameChange = (e) => {
    setSelectedGame(e.target.value); // Update state when a game is selected
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <div className="dropdown-container">
          <label htmlFor="game">Select Game</label>
          <select
            id="game"
            name="game"
            value={selectedGame}
            onChange={handleGameChange}
            required
          >
            <option value="" disabled>
              Choose a game
            </option>
            <option value="Tai Chi">Catcher</option>
            <option value="Balance Trainer">HawkerMama!</option>
            <option value="Catcher">TaiChi1</option>
            <option value="Memory Match">TaiChi2</option>
            <option value="Balance Trainer">TaiChi3</option>
            
          </select>
        </div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="score">Score</label>
            <input
              type="text"
              id="score"
              name="score"
              placeholder="Enter the score"
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            Submit Score
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-container {
    max-width: 600px; /* Increased width */
    background-color: #fff;
    padding: 48px 36px; /* Increased padding */
    font-size: 16px; /* Slightly larger font size */
    font-family: inherit;
    color: #212121;
    display: flex;
    flex-direction: column;
    gap: 25px; /* More spacing between elements */
    box-sizing: border-box;
    border-radius: 12px; /* Slightly more rounded corners */
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.2); /* Enhanced shadow for better visibility */
    margin: 60px auto;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 20px; /* Larger font size for title */
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-container .form-group input,
  .form-container .dropdown-container select {
    width: 100%;
    padding: 16px 20px; /* More padding for inputs */
    border-radius: 8px;
    font-family: inherit;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .form-container .form-submit-btn {
    background-color: #212121;
    color: #fff;
    border: none;
    padding: 16px 20px; /* Bigger button */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }

  .form-container .form-submit-btn:hover {
    background-color: #313131;
  }
`;
    
export default Form;
