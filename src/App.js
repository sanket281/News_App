import React, {Component} from "react";
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component{

  state = {
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  
  render(){
  return (
    <div className="container">
      <Router>
        <Navbar/>
        <LoadingBar progress={this.state.progress} color="red" />
        <Routes>
          
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={4} country="us" category="general"/>}/>
        
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={4} country="us" category="business"/>}/>
       
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={4} country="us" category="entertainment"/>}/>
      
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={4} country="us" category="health"/>}/>
           
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={4} country="us" category="science"/>}/>
           
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={4} country="us" category="sports"/>}/>
          
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={4} country="us" category="technology"/>}/>

        </Routes>
      </Router>
    </div>
  );
}
}

