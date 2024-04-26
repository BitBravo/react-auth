import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { enableMocking } from "./mocks";
import "./index.css";

enableMocking();

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
