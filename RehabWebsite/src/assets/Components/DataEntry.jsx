import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ref, get, update } from "firebase/database";
import { database, auth } from "../../firebase";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const DataEntry = () => {
  const [sessionCount, setSessionCount] = useState(1);
  const [formData, setFormData] = useState({
    game: "",
    score: "",
  });
  const [selectedSession, setSelectedSession] = useState(1); // Set initial session to 1
  const [sessions, setSessions] = useState([]); // List of sessions

  // Fetch sessions from Firebase on component load
  useEffect(() => {
    const fetchSessions = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = ref(database, `acc/${user.uid}/session`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const sessionData = snapshot.val();
        const sessionKeys = Object.keys(sessionData).map((key) =>
          parseInt(key.replace("Session ", ""))
        );
        const highestSession = Math.max(...sessionKeys);

        setSessions(sessionKeys); // Populate dropdown with session numbers
        setSessionCount(highestSession + 1); // Set the next session count
        setSelectedSession(highestSession); // Default to the most recent session
      }
    };

    fetchSessions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle session selection from dropdown
  const handleSessionSelect = (e) => {
    const selected = parseInt(e.target.value);
    setSelectedSession(selected); // Set selected session
    setFormData({ game: "", score: "" }); // Clear form data
  };

  // Handle saving/updating a score for a game
  const handleSubmitScore = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in!");
      return;
    }

    if (!formData.game || !formData.score) {
      alert("Please select a game and enter a score!");
      return;
    }

    const sessionRef = ref(
      database,
      `acc/${user.uid}/session/Session ${selectedSession}/${formData.game}`
    );

    await update(sessionRef, {
      Score: formData.score,
    });

    alert(
      `Score saved/updated under Session ${selectedSession} for ${formData.game}.`
    );
    setFormData({ game: "", score: "" }); // Reset form data
  };

  // Handle finishing a session
  const handleFinishSession = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in!");
      return;
    }

    // Add the current session to Firebase (if not already there)
    const sessionRef = ref(
      database,
      `acc/${user.uid}/session/Session ${sessionCount}`
    );
    await update(sessionRef, {}); // Ensure the session exists in Firebase

    setSessions((prev) => [...new Set([...prev, sessionCount])]); // Ensure no duplicates
    setSessionCount(sessionCount + 1); // Increment session count
    setSelectedSession(sessionCount + 1); // Move to the next session
    setFormData({ game: "", score: "" }); // Reset form data
    alert(`Session ${sessionCount} finished. Starting new session.`);
  };

  return (
    <StyledWrapper>
      <NavBar />
      <div className="layout">
        <SideBar />
        <div className="content">
          <div className="session-header">
            <h2>Current Session: {sessionCount}</h2>
          </div>
          <div className="session-dropdown">
            <label htmlFor="session-dropdown">View/Update Sessions:</label>
            <select
              id="session-dropdown"
              onChange={handleSessionSelect}
              value={selectedSession}
            >
              {[...new Set([...sessions, sessionCount])].map((session) => (
                <option key={session} value={session}>
                  Session {session}
                </option>
              ))}
            </select>
          </div>
          <div className="form-container">
            <label htmlFor="game">Select Game</label>
            <select
              id="game"
              name="game"
              value={formData.game}
              onChange={handleInputChange}
            >
              <option value="">Choose a game</option>
              <option value="Catching">Catching</option>
              <option value="HawkerMama">HawkerMama!</option>
              <option value="Tai Chi 1">Tai Chi 1</option>
              <option value="Tai Chi 2">Tai Chi 2</option>
              <option value="Tai Chi 3">Tai Chi 3</option>
            </select>
            <label htmlFor="score">Score</label>
            <input
              type="text"
              id="score"
              name="score"
              placeholder="Enter the score"
              value={formData.score}
              onChange={handleInputChange}
            />
            <button
              className="form-submit-btn"
              onClick={handleSubmitScore}
              type="button"
            >
              Submit/Update Score
            </button>
          </div>
          <button
            className="finish-session-btn"
            onClick={handleFinishSession}
            type="button"
          >
            Finish Session
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .layout {
    display: flex;
    flex-direction: row;
    margin-top: 60px; /* Adjust for Navbar height */
  }

  .content {
    flex: 1;
    padding: 20px;
    margin-left: 250px; /* Adjust based on Sidebar width */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .session-header {
    background-color: #f8f9fa;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
    max-width: 400px;
  }

  .session-dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .session-dropdown label {
    font-weight: bold;
  }

  .session-dropdown select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }

  .form-container label {
    font-weight: bold;
  }

  .form-container select,
  .form-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-submit-btn {
    margin-top: 10px;
    background-color: #212121;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .form-submit-btn:hover {
    background-color: #313131;
  }

  .finish-session-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .finish-session-btn:hover {
    background-color: #0056b3;
  }
`;

export default DataEntry;
