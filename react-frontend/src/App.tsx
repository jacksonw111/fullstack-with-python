import { useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./router";
import { Toaster } from "./components/ui/toaster";

function App() {
  const constant_routes = useRoutes(routes);
  return (
    <>
      {constant_routes}
      <Toaster />
    </>
  );
}

export default App;
