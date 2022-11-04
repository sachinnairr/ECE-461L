import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/loginPage';
import ProjectsPage from './pages/projectsPage';
import HardwarePage from './pages/hardwarePage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/projects" element={<ProjectsPage />}/>
        <Route path="/hardware" element={<HardwarePage />}/>
        <Route path="/manageProjects" element={<manageProject/>}/>
      </Routes>
      </BrowserRouter>
      <Dashboard/>
    </div>
  );
}

export default App;
