import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminThemeProvider from "../components/ThemeProvider";
import DashBoard from "../pages/admin/dashboard";
import SetWinner from "../pages/admin/setWinner";
import Login from "../pages/admin/login";
import AdminProtected from "./adminProtected";
import UserList from "../pages/admin/userList";
import WinnerNumber from "../pages/admin/winnernumber";
import Home from "../pages/ui/home";
import Winners from "../pages/ui/winners";
import Privacy from "../pages/ui/privacy";
import About from "../pages/ui/aboutus";
import TermsandConditions from "../pages/ui/TermsandConditions";
import Rules from "../pages/ui/rules";
import Contact from "../pages/ui/Contact";

const router = createBrowserRouter([
  {
    path: "/privacy",
    element: <Privacy />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/termsconditions",
    element: <TermsandConditions />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/rules",
    element: <Rules />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/",
    element: <Home />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,
  },
  {
    path: "/admin/login",
    element: <Login />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/dashboard",
    element: (
      <AdminProtected>
        <AdminThemeProvider>
          <DashBoard />
        </AdminThemeProvider>
      </AdminProtected>
    ),
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/setwinner",
    element: (
      <AdminProtected>
        <AdminThemeProvider>
          <SetWinner />
        </AdminThemeProvider>
      </AdminProtected>
    ),
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/userlist",
    element: (
      <AdminProtected>
        <AdminThemeProvider>
          <UserList />
        </AdminThemeProvider>
      </AdminProtected>
    ),
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/winnernumber",
    element: (
      <AdminProtected>
        <AdminThemeProvider>
          <WinnerNumber />
        </AdminThemeProvider>
      </AdminProtected>
    ),
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,

  },
  {
    path: "/winners",
    element: <Winners />,
    errorElement: <h2 className="text-white text-center" style={{margin: "20%"}} > Internal Server Error ! </h2>,
  },
]);

const RouterProviders = () => {
  return <RouterProvider router={router} />;
};

export default RouterProviders;
