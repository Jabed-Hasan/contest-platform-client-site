import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Contest from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import MyAddedItems from "../pages/Dashboard/MyAddedItems/MyAddedItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Details from "../pages/Shared/MenuItem/Details";
import Payment from "../pages/Dashboard/Payment/Payment";
import WinningContest from "../Layout/WinningContest";
import Profile from "../Layout/Profile";
import Contac from "../Layout/Contac";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import CreatorRoute from "./CreatorRoute";
import { ListSubheader } from "@mui/material";
import Leaerboard from "../Layout/Leaerboard";
import About from "../pages/Shared/NavBar/About";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'details/:id', 
          element: <PrivateRoute><Details></Details></PrivateRoute>,
         loader: ({params}) => fetch(`https://b8a12-server-side-jabed-hasan.vercel.app/menu/${params.id}`)
        },
        {
          path: 'timer/:id', 
          element: <PrivateRoute><Details></Details></PrivateRoute>,
         loader: ({params}) => fetch(`https://b8a12-server-side-jabed-hasan.vercel.app/menu/${params.id}`)
        },
        {
          path: '/contests',
          element: <Contest></Contest>,
        },
        {
          path: '/order',
          element: <Contest></Contest>,
          //loader: () => fetch(`https://b8a12-server-side-jabed-hasan.vercel.app/menu`)
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/contact',
          element: <Contac></Contac>
        },
        {
          path: '/about',
          element: <About></About>,
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes

        {
             path: 'userHome',
             element: <UserHome></UserHome>

        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'leaderboard',
          element: <PrivateRoute><Leaerboard></Leaerboard></PrivateRoute>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'winnings',
          element: <WinningContest></WinningContest>
        },
        {
          path: 'profile',
          element: <Profile></Profile>
        },
        //creator route 
        {
          path: 'addItems',
          element: <CreatorRoute><AddItems></AddItems></CreatorRoute>
        },
        {
          path: 'myItems',
          element: <CreatorRoute> <MyAddedItems></MyAddedItems> </CreatorRoute>
        },
        {
          path: 'updateItem/:id',
          element: <UpdateItem></UpdateItem>,
          loader: ({params}) => fetch(`https://b8a12-server-side-jabed-hasan.vercel.app/menu/${params.id}`)
        },

        // admin only routes
        {
          path:'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        
        {
          path: 'updateItem/:id',
          element: <UpdateItem></UpdateItem>,
          loader: ({params}) => fetch(`https://b8a12-server-side-jabed-hasan.vercel.app/menu/${params.id}`)
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>

        }

      ]
    }
  ]);