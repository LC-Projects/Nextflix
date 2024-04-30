import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoutes() {
    const auth = useAppSelector((state) => state.auth);

    return auth.email ? <Outlet/> : <Navigate to="/login"/>
}