import React, { Suspense } from "react";
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
          <Suspense fallback={<div>加载中……</div>}>
            <App />
          </Suspense>
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
