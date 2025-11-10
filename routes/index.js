import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AppRoutes from "./app.routes";
import Pin from "../pages/Pin";

export default function Routes() {
    const { autenticado } = useContext(AppContext);

    if (!autenticado) return <Pin />;

    return <AppRoutes />;
}
