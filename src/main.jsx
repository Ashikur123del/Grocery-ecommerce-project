import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';
import BestProduct from './Pages/BestProducts/BestProduct';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import PorpularProduct from './Pages/PopularProducts/PorpularProduct';
import PorpularProductDetails from './Pages/PorpularProductDetails/PorpularProductDetails';
import YourSpecialBrandProducts from './Pages/YourSpecialBrandProducts/YourSpecialBrandProducts';
import YourSpecialBrandProductsDetails from './Pages/YourSpecialBrandProductsDetails/YourSpecialBrandProductsDetails';
import ProductList from './Pages/ProductList/ProductList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      { index: true, element: <Home /> },
      { path: "best-products", element: <BestProduct /> },
      { path: "best-products/:id", element: <ProductDetails /> },
      { path: "popular-product", element: < PorpularProduct /> }, 
      { path: "popular-product/:id", element: <PorpularProductDetails /> },
      { path: "YourSpecialBrandProducts", element: <YourSpecialBrandProducts /> },
      { path: "YourSpecialBrandProducts/:id", element: <YourSpecialBrandProductsDetails /> },
      { path: "product-list", element: <ProductList /> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)