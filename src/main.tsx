import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProjectList from "./components/project-list";
import ProjectDetails from "./components/project-details";
import Layout from './components/layout.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import LoginPage from './components/login-page.tsx';
import {QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {toast, Toaster} from 'sonner';
import {AxiosError} from 'axios';
import './i18n.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true
    }
  },
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        //Log out user?
      }
      //Log stuff
      console.log("Error")
    /*  appInsights.trackException({
        exception: err as Error,
        properties: {
          queryKey: JSON.stringify(query.queryKey),
          meta: JSON.stringify(query.meta),
          hash: query.queryHash,
          properties: {
            'user-id': user?.id ?? 'Unknown',
            'device-os': Platform.OS,
            'device-version': Platform.Version,
          },
        },
      });*/
    },
    onSuccess: (_, query) => {
      const meta  =(query.meta as Record<string, unknown>);
      if (meta.showNotification) {
        toast.success("Data Fetched " + meta.operationName);
      }
    }
  })
})

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Hello World</div>,
      },
      {
        path: "/login",
        element: <LoginPage/>,
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-center' richColors={true} />
        <ReactQueryDevtools initialIsOpen={false} />

      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
