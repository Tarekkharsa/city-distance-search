import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SearchResult from "./screens/SearchResult";
import Search from "./screens/Search";
import ErrorPage from "./screens/ErrorPage";
import Example from "./screens/interview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/search",
        element: <Search />,
        index: true,
      },
      {
        path: "/result",
        element: <SearchResult />,
      },
      {
        path: "/example",
        element: <Example />,
      },
      {
        path: "/",
        element: <Navigate to={`/search`} replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
