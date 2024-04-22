import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/LoginOrRegisterPage/Login";
import Register from "./pages/LoginOrRegisterPage/Register";
import HomePage from "./pages/HomePage/HomePage";
import UndefinedPage from "./pages/UndefinedPage/UndefinedPage";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";

const queryClient = new QueryClient();

export const spotifyStoreContext = createContext();

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParams)
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <spotifyStoreContext.Provider value={token}>
                  <HomePage />
                </spotifyStoreContext.Provider>
              }
            />
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
