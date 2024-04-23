import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from '../layout/LoginForm';
import RegisterForm from '../layout/RegisterForm';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import UserHome from '../layout/Home';
import NewProduct from '../layout/NewProduct';
import  Category  from '../layout/admin/category';
import Product from "../layout/admin/product"; // Update the import statement
import User from "../layout/admin/user";
import adminHome from '../layout/admin/adminHome';
import showproductsFull from '../layout/showproductsFull'



const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: '/login', element: <LoginForm /> },
      {path: '/showproductsFull', element: <showproductsFull/>},
      { path: '/register', element: <RegisterForm /> },
      
    ]
  }
]);

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [{ index: true, element: <UserHome /> }]
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <adminHome/> },
      { path: '/product', element: <Product/> }, 
      { path: '/category', element: <Category /> },
      { path: '/user', element: < User/> },
      
    ]
  }
]);

export default function AppRouter() {
  const { user } = useAuth();

  const finalRouter = !user?.id ? guestRouter : user.role === 'ADMIN' ? adminRouter : userRouter;

  return <RouterProvider router={finalRouter} />;

}
