import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import Movies from "./pages/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
