import { useEffect, useState } from "react";
import { fetchValues } from "../../services/api";
import "./Chart.css";

const EmploymentTypeChart = () => {
  const [fullTime, setFullTime] = useState(0);
  const [partTime, setPartTime] = useState(0);
  const [dailyWage, setDailyWage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchValues(3);
        const [fullTime, partTime, dailyWage] = result;
        setDailyWage(dailyWage);
        setFullTime(fullTime);
        setPartTime(partTime);

        drawPieChart(fullTime, partTime, dailyWage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to draw a pie chart with labels using HTML5 canvas
  const drawPieChart = (fullTime, partTime, dailyWage) => {
    const canvas = document.querySelector(".EmploymentTypePieChart");
    const ctx = canvas.getContext("2d");

    const total = fullTime + partTime + dailyWage;
    const fullTimePercentage = Math.floor((fullTime / total) * 100);
    const dailyWagePercentage = Math.floor((dailyWage / total) * 100);
    const partTimePercentage = Math.floor((partTime / total) * 100);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSegment(
      ctx,
      centerX,
      centerY,
      radius,
      0,
      (fullTimePercentage / 100) * 2 * Math.PI,
      "blue",
      `Full Time : ${fullTimePercentage}%`
    );

    drawSegment(
      ctx,
      centerX,
      centerY,
      radius,
      (fullTimePercentage / 100) * 2 * Math.PI,
      ((fullTimePercentage + partTimePercentage) / 100) * 2 * Math.PI,
      "green",
      `Part Time : ${partTimePercentage}%`
    );

    drawSegment(
      ctx,
      centerX,
      centerY,
      radius,
      ((fullTimePercentage + partTimePercentage) / 100) * 2 * Math.PI,
      2 * Math.PI,
      "orange",
      `Daily Wage: ${dailyWagePercentage}%`
    );
  };

  const drawSegment = (
    ctx,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    color,
    label
  ) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();

    const labelX = x + (radius / 2) * Math.cos((startAngle + endAngle) / 2);
    const labelY = y + (radius / 2) * Math.sin((startAngle + endAngle) / 2);
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(label, labelX, labelY);
  };

  return (
    <div className="EmploymentChart">
      <h1>Employment Type</h1>
      <canvas
        className="EmploymentTypePieChart"
        width="400"
        height="400"
      ></canvas>
      <ul>
        <li>{`Total Users : ${partTime + fullTime + dailyWage}`}</li>
        <li>{`FULL TIME : ${fullTime}`}</li>
        <li>{`PART TIME : ${partTime}`}</li>
        <li>{`DAILY WAGE : ${dailyWage}`}</li>
      </ul>
    </div>
  );
};

export default EmploymentTypeChart;
