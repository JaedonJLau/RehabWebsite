import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../../firebase";
import { Line } from "react-chartjs-2";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "../Styles/PredictionPage.css";

function PredictionPage() {
  const [sessions, setSessions] = useState([]);
  const [weightedData, setWeightedData] = useState([]);

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

        // Calculate weighted scores for each session
        const weightages = {
          Catching: 0.4,
          HawkerMama: 0.3,
          "Tai Chi 1": 0.1,
          "Tai Chi 2": 0.1,
          "Tai Chi 3": 0.1,
        };

        const weightedScores = sessionList.map((session) => {
          let totalScore = 0;
          Object.keys(weightages).forEach((game) => {
            const gameScore = session.games[game]?.Score || 0;
            totalScore += gameScore * weightages[game];
          });
          return { session: session.id, score: totalScore.toFixed(2) };
        });

        setWeightedData(weightedScores);
      }
    });
  }, []);

  const renderLineGraph = () => {
    const labels = weightedData.map((data) => data.session);
    const scores = weightedData.map((data) => data.score);

    const lineChartData = {
      labels,
      datasets: [
        {
          label: "Weighted Scores Over Sessions",
          data: scores,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Difficulty Threshold",
          data: new Array(scores.length).fill(50), // Threshold line
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          borderDash: [5, 5], // Dashed red line
          fill: false,
        },
      ],
    };

    return (
      <div className="chart-container">
        <h3>Predictive Analysis</h3>
        <Line data={lineChartData} />
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="layout">
        <SideBar />
        <div className="content">
          <h2>Predictive Analysis</h2>
          {weightedData.length > 0 ? renderLineGraph() : <p>Loading data...</p>}
        </div>
      </div>
    </div>
  );
}

export default PredictionPage;
