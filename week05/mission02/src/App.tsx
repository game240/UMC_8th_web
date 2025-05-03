import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Landing from "./pages/Landing";

import ProtectedRoute from "./route/ProtectedRoute";

import "./App.css";

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
        element: <ProtectedRoute />,
        children: [
          {
            path: "mypage",
            element: <Mypage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
