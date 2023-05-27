import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Screens/Home";
import Signin from "./Screens/Signin";
import Signup from "./Screens/Signup";
import Main from "./Screens/Main";

function App() {


  return (
    <>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>

        <BrowserRouter>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/signin" element={<Signin/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/main" element={<Main/>}/>
          </Routes>
        </div>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
