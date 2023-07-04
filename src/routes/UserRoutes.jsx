import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import BoardPage from "../Pages/BoardPage";
import ManageAccess from "../Pages/ManageAccess";
import DefaultLayout from "../Layout/DefaultLayout";
import ManagePeople from "../Pages/ManagePeople";
import { ViewTeam } from "../Pages/ViewTeam";
import ScheduleMeeting from "../Pages/ScheduleMeeting";
import { AssignToMe } from "../Pages/AssignToMe";
import { CreateMeeting } from "../Pages/CreateMeeting";
import { VideoRoom } from "../Components/User/VideoCall/VideoRoom";

function UserRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        const verifyToken = () => {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/");
            }
        };
        verifyToken();
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectRoutes route={"/"} />}>
                <Route element={<DefaultLayout />}>
                    <Route
                        path="/manage-category"
                        element={<ManageCeteogry />}
                    />
                    <Route
                        path="/project-management"
                        element={<ProjectManagement />}
                    />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/manage-team" element={<Team />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/edit-project/:id" element={<EditProject />} />
                    <Route
                        path="/manage-team/manage-people"
                        element={<ManagePeople />}
                    />
                    <Route path="/manage-team/:id" element={<ViewTeam />} />
                    <Route
                        path="/schedule-meeting"
                        element={<ScheduleMeeting />}
                    />
                    <Route path="/create-meeting" element={<CreateMeeting />} />
                    <Route path="/meeting/:roomId" element={<VideoRoom />} />
                    <Route path="/assinged-to-me" element={<AssignToMe />} />
                </Route>
                {/* <Route path="/plan-pricing" element={<PlanPricingPage />} /> */}
                <Route element={<ProjectManagementLayout />}>
                    <Route
                        path="/project-management/:name/board"
                        element={<BoardPage />}
                    />
                    <Route
                        path="/project-management/:name/manage-access"
                        element={<ManageAccess />}
                    />
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
