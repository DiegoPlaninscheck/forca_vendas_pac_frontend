
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register/client" element={<Register type="client" />} />
        <Route path="/register/product" element={<Register type="product" />} />
        <Route path="/register/order" element={<Register type="order" />} />
      </Routes>
    </Router>
  );
}

export default App;
