// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Registration from "./component/registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
