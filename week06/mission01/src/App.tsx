import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Landing from "./pages/Landing";

import ProtectedRoute from "./route/ProtectedRoute";

import "./App.css";
import GoogleLoginRedirect from "./pages/GoogleLoginRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Landing /> },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirect />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "mypage",
            element: <Mypage />,
          },
          { path: "/lp/:id", element: <div></div> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
