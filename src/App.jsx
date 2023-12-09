import React, { useEffect, useState } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './components/web/home/Home.jsx'
import Layout from './layouts/Layout';
import Register from './components/web/register/Register';
import Login from './components/web/login/Login';
import Categories from './components/web/categories/Categories.jsx';
import DashedLayout from './layouts/DashedLayout.jsx';
import HomeDashed from './components/dashboared/home/Home.jsx';
import CategoriesDashed from './components/dashboared/categories/Categories.jsx';
import { jwtDecode } from 'jwt-decode';
import Products from './components/web/products/Product.jsx';
import CategoriesDetails from './components/web/categories/CategoriesDetails.jsx';
import Product from './components/web/products/Product.jsx';
import CartContextProvider from './components/web/context/Cart.jsx';
import USerContextProvider from './components/web/context/Usercontext.jsx';
import Cart from './components/web/cart/Cart.jsx';
import SendCode from './components/web/login/SendCode.jsx';
import ForgetPassword from './components/web/login/ForgetPassword.jsx';
import ProtectedRoutes from './components/web/products/protectedRoutes/ProtectedRoutes.jsx';
import Profile from './components/web/profile/Profile.jsx';



export default function App() {


  const [user,setUser]=useState(null);
const saveCurrentUser=()=>{
  const token =localStorage.getItem('userToken');
  const decoded=jwtDecode(token);
 setUser(decoded);

}
useEffect(()=>{
  if (localStorage.getItem("userToken")){
    saveCurrentUser();
  }
},[])

const router= createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[{
      path:'register',
      element:<Register/>
    },
    {
      path:'login',
      element:<Login />
    },{
      path:'categories',
      element:<Categories/>
    },{
      path:'product',
      element:<Products/>
    },
    {
      path:'products/category/:categoryId',
      element:<CategoriesDetails/>
    },
    {
      path:'products/category/:categoryId/product/:productId',
      element:<Product/>
    },
    {
      path:'cart',

      element:
      <ProtectedRoutes>
           <Cart/> 
      </ProtectedRoutes>
     
    },
    {
      path:'sendcode',
      element:<SendCode/>
    },
    {
      path:'forgetpassword',
      element:<ForgetPassword/>
    },
    {
      path:'profile',
      element:<Profile/>
    },
    
    {
      path:'*',
      element:<h2>Page not found</h2>
    },
    {
      path:'home',
      element:<Home/>
    }
    ]
  },

  {
    path:'/dashed',
    element:<DashedLayout/>,

    children:[{
      path:'home',
      element:<HomeDashed/>
    },
    {
      path:'categories',
      element:<CategoriesDashed/>
    },
    {
      path:'*',
      element:<h2>Page not found</h2>
    }
    ]
  }
])

  return (
    <USerContextProvider>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
    </USerContextProvider>
  )
}
