// DO NOT TOUCH THE BELOW LINE
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/Store"; // Import your Redux store
import App from "./App";

// DO NOT TOUCH THE BELOW 3 LINES
if (window.Cypress) {
  window.store = store;
}

// WRITE YOUR CODE HERE
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>  
      <App />
    </Provider>
  </React.StrictMode>
);

// DO NOT TOUCH THE BELOW LINE
reportWebVitals();
