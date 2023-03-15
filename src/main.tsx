import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./screens/ErrorPage";
import Search from "./screens/Search";
import SearchResult from "./screens/SearchResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/search",
        element: <Search />,
      },
      {
        path: "/result",
        element: <SearchResult />,
      },
      {
        path: "/",
        element: <Navigate to={`search`} replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
