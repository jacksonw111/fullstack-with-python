import React from "react";
import ReactDOM from "react-dom/client";
import "animate.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AppContextProvider } from "./AppContext.tsx";
import "./index.css";
import { AuthContextProvider } from "./AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
