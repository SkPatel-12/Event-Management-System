import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth.jsx";
import Events from './pages/Events.jsx';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Auth />} />
        {/* <Route path="*" element={<NotFound />} /> For 404 Not Found */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
