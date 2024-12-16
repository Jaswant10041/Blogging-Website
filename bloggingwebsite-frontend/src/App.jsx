import React from "react";
import { BrowserRouter as Router, Routes, Route, useMatch } from "react-router-dom";
import { AuthRoute, GuestRoute } from "./components";
// import GuestRoute from "./components/GuestRoute";
// import AuthRoute from "./components/AuthRoute";
import './index.css'
import { Auth } from "./pages";

const App = () => {
  
  return (
    <Router>
      <div>
        <header></header>
        <main>
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/register" element={<Auth />}>
              <Route path="/register" element={<h1>Register</h1>} />
            </Route>
            <Route path="/login" element={<Auth />}>
              <Route path="/login" element={<h1>Login page</h1>} />
            </Route>
            <Route path="/settings" element={<h1>Settings page</h1>} />
            <Route path="/editor" element={<h1>Editor page</h1>} />
            <Route path="/editor/:id" element={<h1>Editor page</h1>} />
            <Route path="/article/:slug" element={<h1>Article page</h1>} />
            <Route path="/profile/:username" element={<h1>Profile page</h1>} />
            <Route path="/@:username" element={<h1>Profile page</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
