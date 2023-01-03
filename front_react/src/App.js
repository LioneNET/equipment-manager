import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {routes, defaultRoute} from "./routes";

function App() {
  return (
    <div className="App">
      <div className="container">
        <main>
          <BrowserRouter>
            <Routes>
              {
                routes.map(route => (
                    <Route path={route.path} element={route.component} key={route.path}/>
                ))
              }
              <Route path='*' element={<Navigate to={defaultRoute} />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </div>
  );
}

export default App;
