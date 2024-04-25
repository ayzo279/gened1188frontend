import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar.js';
import { useEffect, useState } from 'react';
import SideTab from './components/Sidetab';
import Posts from './components/Posts';
import Home from './components/Home';
import Forum from './components/Forum';
import Discussion from './components/Discussion';

import { Routes, Route } from "react-router-dom";




function App() {

  useEffect(() => {
      document.title = "Gened1188"
    }, []);

  return (
      <div>
          <Navbar />
          {/* <SideTab />
          <Posts /> */}
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/forum" element={<Forum/>}/>
              <Route path="/discussion/:promptId" element={<Discussion/>} />
          </Routes>
          {/* <Projects/> */}
      </div>
  );
}

export default App;
