import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoutes() {
    const auth = useAppSelector((state) => state.auth);

    return auth.api_key ? <Outlet/> : <Navigate to="/login"/>
}