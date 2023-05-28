import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../container/Home";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const Router = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
