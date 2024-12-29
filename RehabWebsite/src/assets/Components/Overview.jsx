import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../../firebase";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import for chart.js
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "../Styles/Overview.css";


function Overview() {
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const sessionRef = ref(database, `acc/${user.uid}/session`);
    onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const games = ["Catching", "HawkerMama", "Tai Chi 1", "Tai Chi 2", "Tai Chi 3"];
        const overview = {};

        games.forEach((game) => {
          overview[game] = {
            labels: [],
            scores: [],
          };
        });

        Object.keys(data).forEach((sessionId) => {
          games.forEach((game) => {
            if (data[sessionId][game] && data[sessionId][game].Score) {
              overview[game].labels.push(sessionId);
              overview[game].scores.push(data[sessionId][game].Score);
            }
          });
        });

        setOverviewData(overview);
      }
    });
  }, []);

  const renderOverviewGraphs = () => {
    const games = ["Catching", "HawkerMama", "Tai Chi 1", "Tai Chi 2", "Tai Chi 3"];
    return games.map((game) => {
      const data = overviewData[game] || { labels: [], scores: [] };
      const lineChartData = {
        labels: data.labels,
        datasets: [
          {
            label: `${game} Progression`,
            data: data.scores,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      };

      const chartOptions = {
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
      };

      return (
        <div className="chart-container" key={game}>
          <h3>{game}</h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>
      );
    });
  };

  return (
    <div>
      <NavBar />
      <div className="layout">
        <SideBar />
        <div className="content">
          
          <div className="overview-graphs">{renderOverviewGraphs()}</div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
