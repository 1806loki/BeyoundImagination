import EmploymentTypeChart from "../../components/Charts/EmploymentTypeChart";
import GenderChart from "../../components/Charts/GenderChart";
import { useUserContext } from "../../context/UserContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { loggedInUser } = useUserContext();

  return (
    <div className="dashboard-container">
      {loggedInUser ? (
        <>
          <h1>KEY PERFORMANCE INDICATOR</h1>
          <div>
            <GenderChart />
          </div>
          <div>
            <EmploymentTypeChart />
          </div>
        </>
      ) : (
        <div className="login-message">
          <p>Please log in to view charts and personalized data.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
