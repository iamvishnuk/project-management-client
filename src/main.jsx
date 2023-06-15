import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const client_id = import.meta.env.VITE_REACT_APP_CLIENT_ID;
import { ToastContainer } from "react-toastify";
import { Store, persistor } from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={client_id}>
                <App />
                <ToastContainer />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);
