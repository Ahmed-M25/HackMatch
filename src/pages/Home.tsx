import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Project ReDream Team</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default Home;
