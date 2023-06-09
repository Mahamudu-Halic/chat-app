import React, { useContext } from "react";
import SignUp from "./account/signup";
import Login from "./account/login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./chat components/home";
import { AuthContext } from "./context/authContext";

const App = () => {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login' />
    }

    return children
  }

  return(
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home /> 
            </ProtectedRoute>
          }/>
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      {/* <SignUp /> */}
    </div>
    </BrowserRouter>
  )
}

export default App