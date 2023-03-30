import { Divider } from 'antd';
import React from 'react';
import './App.css';
import { Classification } from './components/Classification/Classification';
import { Navigation } from './components/Navigation/Navigation';
import { PageHeader } from './components/PageHeader/PageHeader';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from './components/Routes';
import { Regression } from './components/Regression/Regression';
import { Cluster } from './components/Cluster/Cluster';
import { Formula } from './components/Formula/Formula';

function App() {
  return (
    <div>
      <BrowserRouter>
        <PageHeader/> 
        <Divider />
        <Navigation/>
        <Routes>
            <Route path={routes.classification} element={<Classification/>} />
            <Route path={routes.regression} element={<Regression/>} />
            <Route path={routes.cluster} element={<Cluster/>} />
            <Route path={routes.formula} element={<Formula/>} />
            <Route path='*' element={<Navigate replace to={routes.classification} />} />            
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
