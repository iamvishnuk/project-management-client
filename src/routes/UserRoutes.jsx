import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ManageCeteogry from "../Pages/ManageCeteogry";
import EmailVerificationPage from "../Pages/EmailVerificationPage";
import ProtectRoutes from "../Components/User/ProtectRoutes/ProtectRoutes";
import KanbanBoard from "../Pages/KanbanBoard";
import PlanPricingPage from "../Pages/PlanPricingPage";
import ForgotPassword from "../Pages/ForgotPassword";
import ChangePassword from "../Pages/ChangePassword";
import ErrorPage from "../Pages/ErrorPage";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectRoutes route={"/"} />}>
                <Route path="/manage-category" element={<ManageCeteogry />} />
                <Route path="/kanban-board" element={<KanbanBoard />} />
                <Route path="/plan-pricing" element={<PlanPricingPage />} />
            </Route>
            <Route
                path="/user/:id/verify/:token"
                element={<EmailVerificationPage />}
            />
            <Route path="/change-password/:id/verify/:token" element={<ChangePassword />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
}

export default UserRoutes;
