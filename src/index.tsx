import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./assets/media.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { WidthContextProvider } from "./services/Context/WidthContex";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const root = document.getElementById("root");
if (root) {
    createRoot(root).render(
        // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <WidthContextProvider>
                    <App />
                </WidthContextProvider>
            </Provider>
        </BrowserRouter>
        // </React.StrictMode>
    );
}
