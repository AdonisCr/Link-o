import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Inscription from './pages/Auth/Inscription.jsx';
import Connexion from './pages/Auth/Connexion.jsx';
import Dashboard from "./pages/Dashbord.jsx";
const App = () => {
  return (
  
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Dashbord" element={<Dashboard />} />

      </Routes>
       
      
    </Router>
  );
};

export default App;
