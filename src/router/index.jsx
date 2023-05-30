import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../container/Home";
import Navbar from "../components/Navbar";
import Admin from "../container/Admin";
import Login from "../container/Login";
import Register from "../container/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Dashboard",
    element: <Admin />,
  },
]);

const Router = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} fallbackElement={<p>loading ...</p>} />
    </>
  );
};

export default Router;
