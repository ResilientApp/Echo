import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Home from "./components/Home"
import Ledger from "./components/Ledger";


function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element = {!user ? <Home/> : <Navigate to= "/ledger" />}
            />
            <Route
            path="/ledger"
            element = {user ? <Ledger/> :  <Navigate to= "/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
