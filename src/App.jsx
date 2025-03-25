import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Composants/Home.jsx';
import SignUp from './Composants/SignUp.jsx';
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
