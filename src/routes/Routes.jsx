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
import TrainerProfile from "../pages/TrainerProfile.jsx";
import PaymentSuccess from "../pages/PaymentSuccess.jsx";
import TrainerPayment from "../pages/TrainerPayment.jsx";
// ✅ Tạo router chính
const routes = createBrowserRouter([
  // 👉 Các route chính có layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pt-home", element: <PThome /> },
      { path: "suggest", element: <Suggest /> },
      { path: "suggest/workout", element: <WorkoutSuggest /> },
      { path: "suggest/meal", element: <MealSuggest /> },
      { path: "suggest/meal/:id", element: <MealDetail /> },
      { path: "login", element: <Auth /> },
      { path: "signup", element: <Auth /> },
      { path: "health", element: <HealthManagement /> },
      { path: "profile", element: <Profile /> },
      { path: "bmi", element: <Bmi /> },
      { path: "list-gyms", element: <ListGyms /> },
      { path: "list-trainers", element: <ListTrainers /> },
      { path: "trainers/:id", element: <TrainersDetail /> },
      { path: "vip1", element: <Vip1Page /> },
      { path: "vip2", element: <Vip2Page /> },
      { path: "my-bookings", element: <UserBookings /> },
      { path: "pt-profile", element: <TrainerProfile /> },
      { path: "trainer-payment/:id", element: <TrainerPayment /> },
    ],
  },

  // 👉 Route PaymentSuccess để ngoài cùng, KHÔNG nằm trong MainLayout
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
