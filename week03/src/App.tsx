import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "movies/:category",
        element: <Movies />,
      },
      { path: "movies/detail/:id", element: <MovieDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
