import React, { lazy, Suspense } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./App.css";
import { model } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./Components/utilities";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import styled from "styled-components";

import Navbar from "./Components/Navbar";
import Background from "./Components/Background";
import Loader from "./Components/Loader";

import Main from "./Pages/Main/index";
import Home from "./Pages/Home/index";
import Scan from "./Pages/Scan";
import Payment from "./Pages/Payment";
import SignUp from "./Pages/Signup/index";
import Login from "./Pages/login/index";
import Admin from "./Pages/admin";
import AllProd from "./Pages/Cart/AllProd";
function App() {
  return (
    <AppContainer>
      <Background />
      <main>
        <Router>
          <header>
            <Navbar />
          </header>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/main" element={<Main />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cart" element={<AllProd />} />
            </Routes>
          </Suspense>
        </Router>
      </main>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  & > header {
    min-height: 8vh;
    width: 100%;
    z-index: 2000;
  }
  & > main {
    width: 100%;
    min-height: 92vh;
  }
`;
