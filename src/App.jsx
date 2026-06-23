import './index.css'
import { createBrowserRouter} from "react-router";
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';
import BestProduct from './Pages/BestProducts/BestProduct';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import PorpularProduct from './Pages/PopularProducts/PorpularProduct';
import YourSpecialBrandProducts from './Pages/YourSpecialBrandProducts/YourSpecialBrandProducts';
import ProductList from './Pages/ProductList/ProductList';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import Compare from './Pages/Compare/Compare';
import Wishlist from './Pages/Wishlist/Wishlist';
import OrderTracking from './Pages/OrderTracking/OrderTracking';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import OrderSuccess from './Pages/OrderSuccesPage/OrderSucces';
import AboutPage from './Pages/About/AboutPage';
import ProductsCategoryPage from './Pages/ProductsCategory/ProductsCategoryPage';
import ProductsBrands from './Pages/ProductBrand/ProductsBrands';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './Pages/TermsofService/TermsOfService';
import ReturnPolicy from './Pages/ReturnPolicy/ReturnPolicy';
import PaymentFailed from './Pages/PaymentFailed/PaymentFailed';
import Faqs from './Pages/FAQs/Faqs';
import FlashDealsPage from './Pages/FlashDeals/FlashDealsPage';
import BlogClassicPage from './Pages/BlogClassic/BlogClassicPage';
import ContactPage from './Pages/Contact/ContactPage';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import DashboardHome from './Pages/DashboardLayout/DashboardHome/DashboardHome';
import OverView from './Pages/DashboardLayout/OverviewPage/OverView';



 
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      { index: true, element: <Home /> },
      { path: "best-products", element: <BestProduct /> },
      { path: "best-products/:id", element: <ProductDetails /> },
      { path: "popular-product", element: < PorpularProduct /> }, 
      { path: "YourSpecialBrandProducts", element: <YourSpecialBrandProducts /> },
      { path: "product-list", element: <ProductList /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      {path: "ordersucces", element: <OrderSuccess />} ,
      {path: "payment-failed", element: <PaymentFailed/>},
      { path: "compare", element: <Compare /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "order-tracking", element: <OrderTracking/> },
      { path: 'privacy-policy', element: <PrivacyPolicy />} ,
      {path: "terms-of-service", element: <TermsOfService />},
      {path: "return-policy", element: <ReturnPolicy />},
      {path: "faq",  element: <Faqs />},
      {path: "flash-deals",element: <FlashDealsPage />},
      {path: "blog-classic", element: <BlogClassicPage />},
      {path: 'about', element: <AboutPage />},
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      {path: "products-category", element: <ProductsCategoryPage />},
      {path: "product-brand", element: <ProductsBrands />},
      {path: "contact", element: <ContactPage />}
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // আলাদা লেআউট
    children: [
      { index: true, element: <DashboardHome /> },
      {path: "overview", element: <OverView />}
     
    ]
  }
]); 