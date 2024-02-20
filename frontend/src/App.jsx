/* eslint-disable no-unused-vars */
import React from 'react'
// import { BrowserRouter as Router} from "react-router-dom";
import Header from './Components/Layout/Header/Header'
import "./App.css"
import Footer from './Components/Layout/Footer/Footer'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
          <Header/>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
         
          <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App