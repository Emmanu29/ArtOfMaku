import './index.css';
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx"; // This will correctly import from App.tsx

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}