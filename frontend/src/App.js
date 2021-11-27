import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'

//pages import
import Home from './pages/general/home'
import Login from './pages/user/login'
import Signup from './pages/user/signup'
import UploadResume from './pages/general/uploadResume'
import Snapshot from './pages/company/snapshot'
import Common from './pages/company/common'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route path="/upload" element={<UploadResume/>} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/snapshot" element={<Snapshot />} />
              <Route exact path="/common" element={<Common/>} />

            </Routes>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
