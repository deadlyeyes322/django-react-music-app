import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/LoginOrRegisterPage/Login";
import Register from "./pages/LoginOrRegisterPage/Register";
import HomePage from "./pages/HomePage/HomePage";
import UndefinedPage from "./pages/UndefinedPage/UndefinedPage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="*" element={<UndefinedPage />} />
          </Routes>
        </BrowserRouter>
        {/* <BrowserRouter>
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
      </BrowserRouter> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
