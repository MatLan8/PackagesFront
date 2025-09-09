import { Routes, Route } from "react-router-dom";
import AllPackages from "./pages/AllPackages";
import PackageCreation from "./pages/PackageCreation";
import IndividualPackage from "./pages/IndividualPackage";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <div>
        <NavBar />
        <main style={{ paddingTop: "70px" }}>
          <Routes>
            <Route path="/" element={<AllPackages />} />
            <Route path="/PackageCreation" element={<PackageCreation />} />
            <Route path="/package/:packageId" element={<IndividualPackage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
