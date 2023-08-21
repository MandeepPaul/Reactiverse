import React, { useRef } from "react";

const InvestmentForm = (props) => {
  const currentSavingRef = useRef();
  const yearContributionRef = useRef();
  const interestRef = useRef();
  const durationRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent page refresh

    const userInput = [
      currentSavingRef.current.value,
      yearContributionRef.current.value,
      interestRef.current.value,
      durationRef.current.value,
    ];

    calculateHandler(userInput);
  };

  const calculateHandler = (userInput) => {
    const yearlyData = []; // per-year results

    let currentSavings = +userInput[0];
    const yearlyContribution = +userInput[1];
    const expectedReturn = +userInput[2] / 100;
    const duration = +userInput[3];

    let investedCapital = yearlyContribution + currentSavings;
    let totalInterest = 0;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      totalInterest += yearlyInterest;

      yearlyData.push({
        key: i,
        year: i + 1,
        savingsEndOfYear: currentSavings.toFixed(2),
        yearlyInterest: yearlyInterest.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        investedCapital: investedCapital.toFixed(2),
      });

      investedCapital += yearlyContribution;
    }

    // Send data to parent component
    props.userData(yearlyData);

    clearInputFields();
  };

  const clearInputFields = () => {
    currentSavingRef.current.value = "";
    yearContributionRef.current.value = "";
    interestRef.current.value = "";
    durationRef.current.value = "";
  };

  return (
    <form className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input type="number" id="current-savings" ref={currentSavingRef} />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            ref={yearContributionRef}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input type="number" id="expected-return" ref={interestRef} />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input type="number" id="duration" ref={durationRef} />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button" onClick={submitHandler}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default InvestmentForm;
