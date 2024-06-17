import { createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import AddRecipes from "./pages/AddRecipes";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/add-catalogue",
      element: <AddRecipes />,
    },
  ]);