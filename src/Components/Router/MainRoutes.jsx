import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Hompage from "../Pages/Hompage";
import MenuPage from "../Pages/MenuPage";
import OrderPage from "../Pages/OrderPage";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Settings from "../Users/Settings";
import Profile from "../Users/Profile";
import PrivateRoute from "./PrivateRoute";
import Mycart from "../Pages/Dashboard/Cart/Mycart";
import Allusers from "../Pages/Dashboard/Admin/Allusers";
import AddnewItem from "../Pages/Dashboard/Admin/Additem/AddnewItem";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/ManageItems";
import Payment from "../Pages/Dashboard/PaymentSystem/Payment";
import UserHome from "../Pages/Dashboard/Users/UserHome";
import Paymenthistory from "../Pages/Dashboard/PaymentSystem/Paymenthistory";
import AdminHome from "../Pages/Dashboard/Admin/Home/AdminHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                path: "/",
                element: <Hompage></Hompage>
            },
            {
                path: "menu",
                element: <MenuPage></MenuPage>
            },
            {
                path: "order/:catageory",
                element: <OrderPage></OrderPage>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "registration",
                element: <Registration></Registration>
            },
            {
                path: "settings",
                element: <PrivateRoute><Settings></Settings></PrivateRoute>
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayouts></DashboardLayouts></PrivateRoute>,
        children: [
            //user panel
            {
                path: "mycart",
                element: <PrivateRoute><Mycart></Mycart></PrivateRoute>
            },
            {
                path: "UserHome",
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: "payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "paymenthistory",
                element: <PrivateRoute><Paymenthistory></Paymenthistory></PrivateRoute>
            },
            //admin panel
            {
                path: "allusers",
                element: <AdminRoutes><Allusers></Allusers></AdminRoutes>
            },
            {
                path: "additem",
                element: <AdminRoutes><AddnewItem></AddnewItem></AdminRoutes>
            },
            {
                path: "Manageitems",
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: "adminhome",
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },

        ]
    }
])