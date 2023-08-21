import React, { useState } from "react";
import HeaderIC from "./components/HeaderIC";
import InvestmentForm from "./components/InvestmentForm";
import ResultTable from "./components/ResultTable";

function App() {
  // State to store user data
  const [userData, setUserData] = useState(null);

  // Handler function to update user data state
  const userDataHandler = (userDataArray) => {
    setUserData(userDataArray);
  };

  return (
    <React.Fragment>
      {/* Header */}
      <HeaderIC />

      {/* Investment Form */}
      <InvestmentForm userData={userDataHandler} />

      {/* Display ResultTable if userData is available, otherwise show "No Data Available" */}
      {userData ? (
        <ResultTable result={userData} />
      ) : (
        <h2 style={{ textAlign: "center" }}>No Data Available</h2>
      )}
    </React.Fragment>
  );
}

export default App;
