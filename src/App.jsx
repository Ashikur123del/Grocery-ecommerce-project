import './index.css'
import { createBrowserRouter} from "react-router";
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';
import BestProduct from './Pages/BestProducts/BestProduct';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import PorpularProduct from './Pages/PopularProducts/PorpularProduct';
import PorpularProductDetails from './Pages/PorpularProductDetails/PorpularProductDetails';
import YourSpecialBrandProducts from './Pages/YourSpecialBrandProducts/YourSpecialBrandProducts';
import YourSpecialBrandProductsDetails from './Pages/YourSpecialBrandProductsDetails/YourSpecialBrandProductsDetails';
import ProductList from './Pages/ProductList/ProductList';
import Cart from './Pages/Cart/Cart';
import ProductDetailsPage from './Pages/ProductDetailsPage/ProductDetailsPage';
import Checkout from './Pages/Checkout/Checkout';
import Compare from './Pages/Compare/Compare';
import Wishlist from './Pages/Wishlist/Wishlist';
import OrderTracking from './Pages/OrderTracking/OrderTracking';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';




export const router = createBrowserRouter([
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
      { path: "productdetailspage", element: <ProductDetailsPage/> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "compare", element: <Compare /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "order-tracking", element: <OrderTracking/> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> }
    ]
  },
]);