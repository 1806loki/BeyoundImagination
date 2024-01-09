import { useEffect, useState } from "react";
import { fetchValues } from "../../services/api";
import "./Chart.css";

const GenderChart = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetchValues(2);
      const [maleCount, femaleCount] = data;
      setMaleCount(maleCount);
      setFemaleCount(femaleCount);

      drawPieChart(maleCount, femaleCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const drawPieChart = (maleCount, femaleCount) => {
    const canvas = document.querySelector(".GenderPieChart");
    const ctx = canvas.getContext("2d");    

    const total = maleCount + femaleCount;
    const malePercentage = Math.floor((maleCount / total) * 100);
    const femalePercentage = Math.floor((femaleCount / total) * 100);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, (malePercentage / 100) * 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      (malePercentage / 100) * 2 * Math.PI,
      2 * Math.PI
    );
    ctx.fillStyle = "pink";
    ctx.fill();

    const maleLabelX =
      centerX + (radius / 2) * Math.cos((malePercentage / 100) * Math.PI);
    const maleLabelY =
      centerY + (radius / 2) * Math.sin((malePercentage / 100) * Math.PI);
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(`Male : ${malePercentage}%`, maleLabelX, maleLabelY);

    const femaleLabelX =
      centerX +
      (radius / 2) * Math.cos((malePercentage / 100) * Math.PI + Math.PI);
    const femaleLabelY =
      centerY +
      (radius / 2) * Math.sin((malePercentage / 100) * Math.PI + Math.PI);
    ctx.fillText(`Female : ${femalePercentage}%`, femaleLabelX, femaleLabelY);
  };

  return (
    <div className="GenderChart">
      <h1>Gender</h1>
      <canvas className="GenderPieChart" width="400" height="400"></canvas>;
      <ul>
        <li>{`Total Users : ${maleCount + femaleCount}`}</li>
        <li>{`Male : ${maleCount}`}</li>
        <li>{`Female : ${femaleCount}`}</li>
      </ul>
    </div>
  );
};

export default GenderChart;
