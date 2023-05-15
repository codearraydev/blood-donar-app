// import './App.css';
import './style.css'
import * as React from 'react';
import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import NGOs from './components/NGOs';
import Donors from './components/Donors';
import Volunteers from './components/Volunteers';
import BloodCases from './components/BloodCases';
import SolvedCases from './components/SolvedCases';
import ActiveCases from './components/ActiveCases';
import Home from './components/Home';
import MainLayout from './layout/MainLayout';
import CaseDetails from './components/CaseDetails';


function App() {

  return (
    <ToastProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/NavBar' element={<NavBar />} />
            <Route exact path='/Dashboard' element={<Dashboard />} />
            <Route exact path='/home' element={<MainLayout><Home /></MainLayout>} />
            <Route exact path='/NGOs' element={<NGOs />} />
            <Route exact path='/donors' element={<MainLayout><Donors /></MainLayout>} />
            <Route exact path='/Volunteers' element={<Volunteers />} />
            <Route exact path='/cases' element={<MainLayout>  <BloodCases /></MainLayout>} />
            <Route exact path='/SolvedCases' element={<SolvedCases />} />
            <Route exact path='/ActiveCases' element={<ActiveCases />} />
            <Route exact path='/case-details' element={<MainLayout>  <CaseDetails /></MainLayout>} />
          </Routes>
        </BrowserRouter>

      </div>
    </ToastProvider>

  );
}

export default App;
