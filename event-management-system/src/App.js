import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Events from './pages/Events.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" 
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Auth />} />
          {/* <Route path="*" element={<NotFound />} /> For 404 Not Found */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
