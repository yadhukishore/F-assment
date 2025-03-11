import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './components/login/body/Body';
import ALoginForm from './components/About/About';
import { ToastContainer } from 'react-toastify';
import Providers from './Providers';
import ProtectedRoute from './routes/ProtectedRoute';


function AppContent() {
  return (
    <Providers>
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
    </Providers>
  );
}

function App() {
  return (

      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
  );
}

export default App;
