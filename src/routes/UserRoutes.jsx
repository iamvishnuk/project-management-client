import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ManageCeteogry from "../Pages/ManageCeteogry";
import EmailVerificationPage from "../Pages/EmailVerificationPage";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/manage-category" element={<ManageCeteogry />} />
            <Route
                path="/user/:id/verify/:token"
                element={<EmailVerificationPage />}
            />
        </Routes>
    );
}

export default UserRoutes;
