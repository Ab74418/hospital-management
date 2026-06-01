import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));

import App from "./App";
import "./index.css";
import "./App.css";


root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);