import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/loginPage';
import ProjectsPage from './pages/projectsPage';
import HardwarePage from './pages/hardwarePage';

const URL = "https://sachinnairrtest2.herokuapp.com"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<LoginPage url={URL}/>}/>
        <Route path="/projects" element={<ProjectsPage url={URL}/>}/>
        <Route path="/hardware" element={<HardwarePage url={URL}/>}/>
      </Routes>
      </BrowserRouter>
      <Dashboard/>
    </div>
  );
}

export default App;
