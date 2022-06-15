import React from "react"
import Header from "./components/Header";
import './App.css'
import 'antd/dist/antd.min.css'
import Footer from "./components/Footer";
import StudentsManage from "./studentsManage/StudentsManage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div id="main">
      <Header/>
      <Routes>
        <Route index element={<StudentsManage/>}></Route>
        <Route path="/page/:page" element={<StudentsManage/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
