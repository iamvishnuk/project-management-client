import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const client_id = import.meta.env.VITE_REACT_APP_CLIENT_ID;
import { ToastContainer } from "react-toastify";
import Store from "./Redux/Store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={Store}>
        <GoogleOAuthProvider clientId={client_id}>
            <App />
            <ToastContainer />
        </GoogleOAuthProvider>
    </Provider>
);
