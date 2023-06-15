import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ManageCeteogry from "../Pages/ManageCeteogry";
import EmailVerificationPage from "../Pages/EmailVerificationPage";
import ProtectRoutes from "../Components/User/ProtectRoutes/ProtectRoutes";
import PlanPricingPage from "../Pages/PlanPricingPage";
import ForgotPassword from "../Pages/ForgotPassword";
import ChangePassword from "../Pages/ChangePassword";
import ErrorPage from "../Pages/ErrorPage";
import ProjectManagement from "../Pages/ProjectManagement";
import CreateProject from "../Pages/CreateProject";
import Team from "../Pages/Team";
import UserProfile from "../Pages/UserProfile";
import EditProject from "../Pages/EditProject";
import ProjectManagementLayout from "../Layout/ProjectManagementLayout";
import Board from "../Pages/Board";
import ManageAccess from "../Pages/ManageAccess";
import DefaultLayout from "../Layout/DefaultLayout";
import ManagePeople from "../Pages/ManagePeople";
import { ViewTeam } from "../Pages/ViewTeam";


function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectRoutes route={"/"} />}>
                <Route element={<DefaultLayout />}>
                    <Route path="/manage-category" element={<ManageCeteogry />} />
                    <Route path="/project-management" element={<ProjectManagement />} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/manage-team" element={<Team />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/edit-project/:id" element={<EditProject />} />
                    <Route path="/manage-team/manage-people" element={<ManagePeople />} />
                    <Route path="/manage-team/:id" element={<ViewTeam />} />
                </Route>
                {/* <Route path="/plan-pricing" element={<PlanPricingPage />} /> */}
                <Route element={<ProjectManagementLayout />}>
                    <Route path="/project-management/:name/board" element={<Board />} />
                    <Route path="/project-management/manage-access" element={<ManageAccess />} />
                </Route>
            </Route>
            <Route
                path="/user/:id/verify/:token"
                element={<EmailVerificationPage />}
            />
            <Route
                path="/change-password/:id/verify/:token"
                element={<ChangePassword />}
            />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
}

export default UserRoutes;
