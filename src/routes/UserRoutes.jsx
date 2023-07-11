import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ManageCeteogry from "../Pages/ManageCeteogry";
import EmailVerificationPage from "../Pages/EmailVerificationPage";
import ProtectRoutes from "../Components/User/ProtectRoutes/ProtectRoutes";
import ForgotPassword from "../Pages/ForgotPassword";
import ChangePassword from "../Pages/ChangePassword";
import ErrorPage from "../Pages/ErrorPage";
const ProjectManagement = lazy(() => import("../Pages/ProjectManagement"));
const CreateProject = lazy(() => import("../Pages/CreateProject"));
const Team = lazy(() => import("../Pages/Team"));
const UserProfile = lazy(() => import("../Pages/UserProfile"));
const EditProject = lazy(() => import("../Pages/EditProject"));
import ProjectManagementLayout from "../Layout/ProjectManagementLayout";
const BoardPage = lazy(() => import("../Pages/BoardPage"));
const ManageAccess = lazy(() => import("../Pages/ManageAccess"));
import DefaultLayout from "../Layout/DefaultLayout";
const ManagePeople = lazy(() => import("../Pages/ManagePeople"));
const ViewTeam = lazy(() => import("../Pages/ViewTeam"));
const ScheduleMeeting = lazy(() => import("../Pages/ScheduleMeeting"));
const AssignToMe = lazy(() => import("../Pages/AssignToMe"));
const CreateMeeting = lazy(() => import("../Pages/CreateMeeting"));
const VideoRoom = lazy(() => import("../Components/User/VideoCall/VideoRoom"));
import ThreeCirclesLoader from "../Components/User/Loaders/ThreeCirclesLoader";

function UserRoutes() {
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
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <ProjectManagement />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/create-project"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <CreateProject />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/manage-team"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <Team />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/user-profile"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <UserProfile />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/edit-project/:id"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <EditProject />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/manage-team/manage-people"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <ManagePeople />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/manage-team/:id"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <ViewTeam />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/schedule-meeting"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <ScheduleMeeting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/create-meeting"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <CreateMeeting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/meeting/:roomId"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <VideoRoom />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/assinged-to-me"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <AssignToMe />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<ProjectManagementLayout />}>
                    <Route
                        path="/project-management/:name/board"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <BoardPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/project-management/:name/manage-access"
                        element={
                            <Suspense fallback={<ThreeCirclesLoader />}>
                                <ManageAccess />
                            </Suspense>
                        }
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
