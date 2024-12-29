import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../../firebase";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import for chart.js
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "../Styles/DataView.css"; // Import updated CSS

function DataView() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const sessionRef = ref(database, `acc/${user.uid}/session`);
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sessionList = Object.keys(data).map((key) => ({
          id: key,
          games: data[key],
        }));
        setSessions(sessionList);
      }
    });
  }, []);

  const handleSessionSelect = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);

    const selectedSessionData = sessions.find((session) => session.id === sessionId);
    setSessionData(selectedSessionData ? selectedSessionData.games : {});
  };

  const renderBarGraph = () => {
    const barChartData = {
      labels: Object.keys(sessionData),
      datasets: [
        {
          label: `Scores for Session ${selectedSession}`,
          data: Object.values(sessionData).map((game) => game.Score || 0),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    return (
      <div className="data-view-bar-chart-container">
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="data-view-layout">
        <SideBar />
        <div className="data-view-content">
          <h2>Data View</h2>
          <div className="data-view-session-select">
            <label htmlFor="session-dropdown">Select a Session:</label>
            <select
              id="session-dropdown"
              onChange={handleSessionSelect}
              value={selectedSession || ""}
            >
              <option value="" disabled>
                Select a session
              </option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.id}
                </option>
              ))}
            </select>
          </div>
          {selectedSession && renderBarGraph()}
        </div>
      </div>
    </div>
  );
}

export default DataView;
