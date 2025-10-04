import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import PThome from "../pages/PThome";
import Auth from "../pages/Auth";
import Suggest from "../pages/Suggest";
import WorkoutSuggest from "../pages/WorkoutSuggest";
import MealSuggest from "../pages/MealSuggest";
import MealDetail from "../pages/MealDetail";
import HealthManagement from "../pages/HealthManagement.jsx";
import Profile from "../pages/Profile.jsx";
import Bmi from "../pages/Bmi.jsx";
import ListGyms from "../pages/ListGyms.jsx";
import ListTrainers from "../pages/ListTrainers.jsx";
import Vip1Page from "../pages/Vip1Page.jsx";
import Vip2Page from "../pages/Vip2Page.jsx";
import TrainersDetail from "../pages/TrainerDetail.jsx";
import UserBookings from "../pages/UserBookings.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pt-home",
        element: <PThome />,
      },
      {
        path: "/suggest",
        element: <Suggest />,
      },
      {
        path: "/suggest/workout",
        element: <WorkoutSuggest />,
      },
      {
        path: "/suggest/meal",
        element: <MealSuggest />,
      },
      {
        path: "/suggest/meal/:id",
        element: <MealDetail />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/signup",
        element: <Auth />,
      },
      {
        path: "/health", // ✅ thêm route mới
        element: <HealthManagement />,
      },
      {
        path: "/profile", // ✅ thêm route mới
        element: <Profile />,
      },
      {
        path: "/bmi", // ✅ thêm route mới
        element: <Bmi />,
      },
      {
        path: "/list-gyms", // ✅ thêm route mới
        element: <ListGyms />,
      },
      {
        path: "/list-trainers", // ✅ thêm route mới
        element: <ListTrainers />,
      },
      {
        path: "/trainers/:id",
        element: <TrainersDetail />,
      },

      {
        path: "/vip1",
        element: <Vip1Page />,
      },
      {
        path: "/vip2",
        element: <Vip2Page />,
      },
      {
        path: "/my-bookings",
        element: <UserBookings />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
