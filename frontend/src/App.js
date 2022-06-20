import React from "react"
import Header from "./components/header/Header";
import './App.css'
import 'antd/dist/antd.min.css'
import Footer from "./components/footer/Footer";
import StudentsManage from './pages/studentsManage/StudentsManage'
function App() {
  return (
    <div id="main">
      <Header/>
      <StudentsManage/>
      <Footer/>
    </div>
  );
}

export default App;
