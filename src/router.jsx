import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import 'bootstrap/dist/css/bootstrap.min.cssgit';




const router = createBrowserRouter([
{
    path: "/",
    element: <Layout />,
    children: [{
        index: true,
        element: <Home />   
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {   
        path: "*",
        element: < NotFound />
    }
    ]
}

]);

export default router