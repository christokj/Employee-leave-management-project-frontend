import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <Header />
            <div className="min-h-96">
                <Outlet />
            </div>
        </>
    );
};