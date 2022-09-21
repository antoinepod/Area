import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.text())
      .then(
        (result) => {
          setData(result);
          setLoaded(true);
          console.log(data);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>{data}</h1>
      </>
    );
  }
}

export default App;
