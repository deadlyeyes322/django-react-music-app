import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/LoginOrRegisterPage/Login'
import Register from './pages/LoginOrRegisterPage/Register'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <h1>Hello</h1>
            </ProtectedRoute>
          }
        />
          <Route exact
            path="/login"
            element={<Login />}
          />
          <Route exact
            path="/register"
            element={<Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
