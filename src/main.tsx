import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import {
  EditPost,
  ErrorPage,
  NewPost,
  PostComments,
  Profile,
  Root,
  SignIn,
  SignUp,
  ViewPost,
  Home,
  NewMessage,
  Conversation,
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
      { path: 'profile', element: <Profile /> },
      { path: 'newpost', element: <NewPost /> },
      {
        path: ':id',
        element: <ViewPost />,
        children: [
          { index: true, element: <PostComments /> },
          { path: 'edit', element: <EditPost /> },
        ],
      },
      {
        path: 'newmessage',
        element: <NewMessage />,
      },
      {
        path: 'conversation/:username',
        element: <Conversation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
