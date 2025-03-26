import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from './pages/Auth/SignUp.jsx';
const App = () => {
  return (
  
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
       
      </Routes>
       
      
    </Router>
  );
};

export default App;
