import React from "react";

import Card from "./UI/Card/Card";

const Home = (props) => {
  return (
    <Card className="bg-slate-100 text-white place-content-center h-[90%] m-4 p-2">
      <h2 className="text-lg font-serif text-cyan-600">Things I learned</h2>
      <ul className="text-stone-800 list-disc">
        <li>Use of useEffect Hook</li>
        <li>How to use useEffect with dependencies and cleanup function</li>
        <li>Forward refs and useImperative Hook</li>
      </ul>
    </Card>
  );
};

export default Home;
