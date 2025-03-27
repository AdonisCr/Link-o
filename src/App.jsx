import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Inscription from './pages/Auth/Inscription.jsx';
import Connexion from './pages/Auth/Connexion.jsx';
const App = () => {
  return (
  
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
       
      
    </Router>
  );
};

export default App;
