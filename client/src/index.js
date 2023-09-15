import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

// Instead of ReactDOM.render, use createRoot
const root = createRoot(document.getElementById('root'));

// Render your main component inside the root
root.render(<App />);