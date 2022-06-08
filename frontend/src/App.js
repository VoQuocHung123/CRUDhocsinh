import React from "react"
import Header from "./components/Header";
import './App.css'
import 'antd/dist/antd.min.css'
import Content from "./components/Content";
import Footer from "./components/Footer";
function App() {
  return (
    <div id="main">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
