import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
