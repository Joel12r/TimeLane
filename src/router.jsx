import {
    createHashRouter,
    Link,
    useNavigate
} from "react-router-dom";
import AppShell from "./component/layouts/AppShell";
import { useEffect } from 'react';
import Calendar from './component/calender/Calender'
import Login from './component/auth/Login'
const router = createHashRouter([
    {
        path: "/",
        Element: <AppShell />,
        children: [
            {
                path: "",
                element:<Calendar />,
            },
            {
                path:"/auth/login",
                element:<Login /> ,
            }
        ]
    }
])

export default router 