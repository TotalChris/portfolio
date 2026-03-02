import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
