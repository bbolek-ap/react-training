import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProjectList from "./components/project-list";
import ProjectDetails from "./components/project-details";
import Layout from './components/layout.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Hello World</div>,
      },
      {
        path: "authenticated",
        element: <div>User is Authenticated</div>,
      },
      {
        path: "projects",
        element: <ProjectList />,
        children: [
          {
            path: ":projectId",
            element: <ProjectDetails />,
          },
        ],
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
