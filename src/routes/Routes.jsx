import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ErrorPage } from "../pages/ErrorPage";
import ScrollToTop from "../components/ui/ScrollToTop";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import EmployeePage from "../pages/EmployeePage";
import HomePage from "../pages/HomePage";

import { Dashboard } from "../components/admin/Dashboard";
import { Department } from "../components/admin/Department";
import { LeaveType } from "../components/admin/LeaveType";
import { Employees } from "../components/admin/Employees";
import { LeaveManagement } from "../components/admin/LeaveManagement";
import { ChangePassword } from "../components/admin/ChangePassword";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ScrollToTop>
                <RootLayout />
            </ScrollToTop>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "admin",
                element: <AdminPage />,
                children: [
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "department", element: <Department /> },
                    { path: "leave-type", element: <LeaveType /> },
                    { path: "employees", element: <Employees /> },
                    { path: "leave-management", element: <LeaveManagement /> },
                    { path: "change-password", element: <ChangePassword /> },
                ],
            },
            {
                path: "employee",
                element: (
                    <EmployeePage />
                ),
            },
        ],
    },
]);
