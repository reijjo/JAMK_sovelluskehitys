import { useState } from "react";
import "./App.css";

const App = () => {
  const [what, setWhat] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await fetch("/.netlify/functions/cat");
      const data = await response.json();

      console.log("data", data.data.image);
      setWhat(data.data.image);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <button onClick={getImage}>Click me!</button>

      <div className="gotImage">
        {what && !loading && (
          <img src={what} alt="image" width="300px" height="300px" />
        )}
      </div>
    </div>
  );
};
export default App;
