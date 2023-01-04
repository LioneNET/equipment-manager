import React from 'react';
import {BrowserRouter, Routes} from "react-router-dom";
import {routes, routeTree} from "./routes";

function App() {

  return (
      <div className="App">
        <div className="container">
          <main>
            <BrowserRouter>
              <Routes>
                {routeTree(routes)}
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </div>
  );
}

export default App;
