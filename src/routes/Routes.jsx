import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Suggest from "../pages/Suggest";
import WorkoutSuggest from "../pages/WorkoutSuggest";
import MealSuggest from "../pages/MealSuggest";
import MealDetail from "../pages/MealDetail";

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
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
