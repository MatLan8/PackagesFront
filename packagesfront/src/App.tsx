import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPackages from "./pages/AllPackages";
import PackageCreation from "./pages/PackageCreation";
import NavBar from "./components/navbar/NavBar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
        <main style={{ paddingTop: "70px" }}>
          <Routes>
            <Route path="/" element={<AllPackages />} />
            <Route path="/PackageCreation" element={<PackageCreation />} />
          </Routes>
          <p>Click on the Vite and React logos to learn more</p>
        </main>
      </div>
    </>
  );
}

export default App;
