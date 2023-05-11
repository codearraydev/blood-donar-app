import './App.css';
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            <Route exact path='/NGOs' element={<NGOs />} />
            <Route exact path='/Donors' element={<Donors />} />
            <Route exact path='/Volunteers' element={<Volunteers />} />
            <Route exact path='/BloodCases' element={<BloodCases />} />
            <Route exact path='/SolvedCases' element={<SolvedCases />} />
            <Route exact path='/ActiveCases' element={<ActiveCases />} />
          </Routes>
        </BrowserRouter>

      </div>
    </ToastProvider>

  );
}

export default App;
