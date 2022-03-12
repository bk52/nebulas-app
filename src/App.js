import React from "react";
import AppRouter from "./pages";
import ToastContainer from "./components/ToastContainer";

export default function App() {
    return (
        <>
            <AppRouter></AppRouter>
            <ToastContainer />
        </>
    );
}

