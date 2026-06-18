import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../shared/components/ProtectedRoute";

export const RoutesItems = [
  {
    index: true,
    location: "/",
    element: <Home />,
  },
  {
    path: "login",
    location: "/login",
    element: <Login />,
  },
  {
    path: "register",
    location: "/register",
    element: <Register />,
  },
  {
    path: "dashboard",
    location: "/dashboard",
    lazy: async () => {
      const { default: Dashboard } = await import("../pages/Dashboard");
      return {
        Component: () => <ProtectedRoute element={<Dashboard />} />,
      };
    },
  },
  {
    path: "expenses",
    location: "/expenses",
    lazy: async () => {
      const { default: Dashboard } = await import("../pages/Expenses");
      return {
        Component: () => <ProtectedRoute element={<Dashboard />} />,
      };
    },
  },
  {
    path: "profile",
    location: "/profile",
    lazy: async () => {
      const { default: Profile } = await import("../pages/Profile");
      return {
        Component: () => <ProtectedRoute element={<Profile />} />,
      };
    },
  },
  {
    path: "settings",
    location: "/settings",
    lazy: async () => {
      const { default: Settings } = await import("../pages/Settings");
      return {
        Component: () => <ProtectedRoute element={<Settings />} />,
      };
    },
  },
  {
    path: "lending",
    location: "/lending",
    lazy: async () => {
      const { default: TrackLendings } = await import("../pages/Lendings");
      return {
        Component: () => <ProtectedRoute element={<TrackLendings />} />,
      };
    },
  },
  {
    path: "*",
    location: "*",
    element: <NotFound />,
  },
];
