const ResultTable = (props) => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {/* Iterating over an array received from parent component to show dynaic content.*/}
        {props.result.map((eachResult) => (
          <tr key={eachResult.key}>
            <td>{eachResult.year}</td>
            <td>{eachResult.savingsEndOfYear}</td>
            <td>{eachResult.yearlyInterest}</td>
            <td>{eachResult.totalInterest}</td>
            <td>{eachResult.investedCapital}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
