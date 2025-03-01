import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import { AuthLayout } from './components';
import './index.css';
import {
  AddPostPage,
  EditPostPage,
  HomePage,
  LoginPage,
  MultiplePostsPage,
  PostPage,
  RegisterPage,
} from './pages/index.js';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />,
          </AuthLayout>
        ),
      },
      {
        path: '/register',
        element: (
          <AuthLayout authentication={false}>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: '/posts',
        element: (
          <AuthLayout authentication={true}>
            <MultiplePostsPage />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <AddPostPage />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <EditPostPage />
          </AuthLayout>
        ),
      },
      {
        path: '/posts/:slug',
        element: (
          <AuthLayout authentication={true}>
            <PostPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
