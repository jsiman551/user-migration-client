import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './middlewares/privateRoute';
import { AuthProvider } from './contexts/authContext';

const App: React.FC = () => {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
