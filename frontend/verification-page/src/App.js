import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Home from "./components/google"
import Verify from "./components/verify";
import Verified from "./components/verified"; // Assuming this is your verified component
import Failed from "./components/failed"; 


function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element = {!user ? <Home/> : <Navigate to= "/verify" />}
            />
            <Route
            path="/verify"
            element = {user ? <Verify/> :  <Navigate to= "/" />}
            />
          
          <Route
              path="/verified"
              element={<Verified />} // Render Verified component
            />
            <Route
              path="/failed"
              element={<Failed />} // Render Failed component
            />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
