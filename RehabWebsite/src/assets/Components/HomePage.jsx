import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar"; // Import NavBar
import SideBar from "../Components/SideBar"; // Import SideBar
import "../Styles/HomePage.css"; // Add styling for content if needed
import { ref, get } from "firebase/database";
import { database, auth } from "../../firebase";
import styled from "styled-components";

const HomePage = () => {
  const [sessionCount, setSessionCount] = useState(0); // State to store the number of sessions

  // Fetch the number of sessions from Firebase
  useEffect(() => {
    const fetchSessions = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const sessionRef = ref(database, `acc/${user.uid}/session`);
      const snapshot = await get(sessionRef);

      if (snapshot.exists()) {
        const sessionData = snapshot.val();
        setSessionCount(Object.keys(sessionData).length); // Count the number of sessions
      } else {
        setSessionCount(0); // No sessions found
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="page-container">
      <NavBar /> {/* Navbar */}
      <SideBar /> {/* Sidebar */}
      <div className="content">
        <h2>Homepage</h2>
        <p>Welcome to the homepage! Below is your session summary.</p>
        <StyledWrapper>
          <div className="card">
            <h2>{sessionCount} Sessions</h2> {/* Display number of sessions */}
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

// Styled Component for the Card
const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: #07182e;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;
    margin: 20px auto;
  }

  .card h2 {
    z-index: 1;
    color: white;
    font-size: 1.5em;
  }

  .card::before {
    content: "";
    position: absolute;
    width: 100px;
    background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: "";
    position: absolute;
    background: #07182e;
    inset: 5px;
    border-radius: 15px;
  }
`;

export default HomePage;
