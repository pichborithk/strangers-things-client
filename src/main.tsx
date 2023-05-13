import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import {
  EditPost,
  ErrorPage,
  NewPost,
  PostMessages,
  Profile,
  Root,
  SignIn,
  SignUp,
  ViewPost,
  Home,
} from './router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'register', element: <SignUp /> },
      { path: 'signin', element: <SignIn /> },
      // { path: 'profile', element: <Profile /> },
      // { path: 'new', element: <NewPost /> },
      {
        path: ':id',
        element: <ViewPost />,
        children: [
          { index: true, element: <PostMessages /> },
          { path: 'edit', element: <EditPost /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
