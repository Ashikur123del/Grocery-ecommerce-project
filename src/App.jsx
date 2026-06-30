import './index.css'
import { createBrowserRouter} from "react-router-dom";
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

import ReturnPolicy from './Pages/ReturnPolicy/ReturnPolicy';
import PaymentFailed from './Pages/PaymentFailed/PaymentFailed';
import Faqs from './Pages/FAQs/Faqs';
import FlashDealsPage from './Pages/FlashDeals/FlashDealsPage';
import BlogClassicPage from './Pages/BlogClassic/BlogClassicPage';
import ContactPage from './Pages/Contact/ContactPage';
import Account from "./Pages/MyAccound/Accound"
import OverView from "./Pages/MyAccound/OverViewPage/OverView"
import OrderHistory from './Pages/MyAccound/OrderHistory/OrderHistory';
import DownLoad from "./Pages/MyAccound/MyDownload/DownLoad"
import Return from "./Pages/MyAccound/ReturnRequest/Return"
import PresonalInfo from './Pages/MyAccound/PresonalInfo/PresonalInfo';
import Address from './Pages/MyAccound/Address/Address';
import WishList from './Pages/MyAccound/WishList/WishList';
import MyReviews from './Pages/MyAccound/MyReviews/MyReviews';
import ChangePasswordForm from './Pages/MyAccound/ChangePasswordForm/ChangePasswordForm';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import AddProduct from './Pages/DashboardLayout/AddProduct/AddProduct';
import AllProducts from './Pages/DashboardLayout/AllProducts/AllProducts';
import Orders from './Pages/DashboardLayout/Orders/Orders';
import MediaLibrary from './Pages/DashboardLayout/Medialibrary/Medialibrary';
import Category from './Pages/DashboardLayout/Category/Category';
// import SupportTickets from './Pages/DashboardLayout/Supporttickets/Supporttickets';
// import StoreSettings from './Pages/DashboardLayout/Storesettings/Storesettings';
// import Returns from './Pages/DashboardLayout/returns/returns';
// import Customers from './Pages/DashboardLayout/Customers/Customers';
// import Coupons from './Pages/DashboardLayout/Coupons/Coupons';
// import Payments from './Pages/DashboardLayout/Payments/Payments';
import Inventory from './Pages/DashboardLayout/Inventory/Inventory';
import DashBoradOverview from './Pages/DashboardLayout/Overview/DashBoradOverview';
import TermsofService from './Pages/TermsofService/TermsofService';
// import Analytics from './Pages/DashboardLayout/Analytics/Analytics';
 



 
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
      {path: "terms-of-service", element: <TermsofService />},
      {path: "return-policy", element: <ReturnPolicy />},
      {path: "faq",  element: <Faqs />},
      {path: "flash-deals",element: <FlashDealsPage />},
      {path: "blog-classic", element: <BlogClassicPage />},
      {path: 'about', element: <AboutPage />},
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      {path: "products-category", element: <ProductsCategoryPage />},
      {path: "product-brand", element: <ProductsBrands />},
      {path: "contact", element: <ContactPage />},
       
     { 
  path: "my-accound", 
  element: <Account/>, 
  children: [
    { index: true, element: <OverView /> },
    { path: "overview", element: <OverView /> }, 
    { path: "order-history", element: <OrderHistory />},
    { path: "download", element: <DownLoad />},
    { path: "return", element: <Return />},
    { path: "profile", element: <PresonalInfo />},
    { path: "address", element: <Address />},
    {path: "wishlist", element: <WishList />},
    {path: "reviews", element: <MyReviews />},
    {path: "password", element: <ChangePasswordForm />},
    
  ]
},
    ]
  },


  {
    path: "/dashboard",
    element: <DashboardLayout />, 
    children: [
      {index: true, element: <DashBoradOverview  />},
      {path: "add-product", element: <AddProduct />},
      {path: "products", element: <AllProducts />},
      {path: "categories", element: <Category />},
      {path: 'inventory', element: <Inventory />},
      {path: 'media', element: <MediaLibrary />},
      {path: 'orders', element: <Orders />},
      // {path: 'returns', element: <Returns />},
      // {path: 'customers', element: <Customers />},
      // {path: 'coupons', element: <Coupons />},
      // {path: 'payments', element: <Payments />}
      // {path: "reports", element: <Analytics />},
      // {path: 'support', element: <SupportTickets />},
      // {path: 'store-settings', element: <StoreSettings />}
     
    ]
  }
]); 