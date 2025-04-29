import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";
import ProtectedRoute from "./components/route/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
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
            element: <div>마이페이지</div>,
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
