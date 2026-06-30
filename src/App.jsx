
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Loading component
// eslint-disable-next-line react-refresh/only-export-components
const Loading = () => <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

// Lazy Loader Wrapper
// eslint-disable-next-line react-refresh/only-export-components
const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

// Lazy Imports
const Root = Loadable(lazy(() => import('./Layout/Root')));
const Home = Loadable(lazy(() => import('./Pages/HomePage/Home')));
const BestProduct = Loadable(lazy(() => import('./Pages/BestProducts/BestProduct')));
const ProductDetails = Loadable(lazy(() => import('./Pages/ProductDetails/ProductDetails')));
const PorpularProduct = Loadable(lazy(() => import('./Pages/PopularProducts/PorpularProduct')));
const YourSpecialBrandProducts = Loadable(lazy(() => import('./Pages/YourSpecialBrandProducts/YourSpecialBrandProducts')));
const ProductList = Loadable(lazy(() => import('./Pages/ProductList/ProductList')));
const Cart = Loadable(lazy(() => import('./Pages/Cart/Cart')));
const Checkout = Loadable(lazy(() => import('./Pages/Checkout/Checkout')));
const OrderSuccess = Loadable(lazy(() => import('./Pages/OrderSuccesPage/OrderSucces')));
const PaymentFailed = Loadable(lazy(() => import('./Pages/PaymentFailed/PaymentFailed')));
const Compare = Loadable(lazy(() => import('./Pages/Compare/Compare')));
const Wishlist = Loadable(lazy(() => import('./Pages/Wishlist/Wishlist')));
const OrderTracking = Loadable(lazy(() => import('./Pages/OrderTracking/OrderTracking')));
const PrivacyPolicy = Loadable(lazy(() => import('./Pages/PrivacyPolicy/PrivacyPolicy')));
const TermsOfService = Loadable(lazy(() => import('./Pages/TermsofService/TermsofService')));
const ReturnPolicy = Loadable(lazy(() => import('./Pages/ReturnPolicy/ReturnPolicy')));
const Faqs = Loadable(lazy(() => import('./Pages/FAQs/Faqs')));
const FlashDealsPage = Loadable(lazy(() => import('./Pages/FlashDeals/FlashDealsPage')));
const BlogClassicPage = Loadable(lazy(() => import('./Pages/BlogClassic/BlogClassicPage')));
const AboutPage = Loadable(lazy(() => import('./Pages/About/AboutPage')));
const SignIn = Loadable(lazy(() => import('./Pages/SignIn/SignIn')));
const SignUp = Loadable(lazy(() => import('./Pages/SignUp/SignUp')));
const ProductsCategoryPage = Loadable(lazy(() => import('./Pages/ProductsCategory/ProductsCategoryPage')));
const ProductsBrands = Loadable(lazy(() => import('./Pages/ProductBrand/ProductsBrands')));
const ContactPage = Loadable(lazy(() => import('./Pages/Contact/ContactPage')));
const Account = Loadable(lazy(() => import("./Pages/MyAccound/Accound")));
const OverView = Loadable(lazy(() => import("./Pages/MyAccound/OverViewPage/OverView")));
const OrderHistory = Loadable(lazy(() => import('./Pages/MyAccound/OrderHistory/OrderHistory')));
const DownLoad = Loadable(lazy(() => import("./Pages/MyAccound/MyDownload/DownLoad")));
const Return = Loadable(lazy(() => import("./Pages/MyAccound/ReturnRequest/Return")));
const PresonalInfo = Loadable(lazy(() => import("./Pages/MyAccound/PresonalInfo/PresonalInfo")));
const Address = Loadable(lazy(() => import("./Pages/MyAccound/Address/Address")));
const WishList = Loadable(lazy(() => import("./Pages/MyAccound/WishList/WishList")));
const MyReviews = Loadable(lazy(() => import("./Pages/MyAccound/MyReviews/MyReviews")));
const ChangePasswordForm = Loadable(lazy(() => import("./Pages/MyAccound/ChangePasswordForm/ChangePasswordForm")));

// Dashboard Imports
const DashboardLayout = Loadable(lazy(() => import('./Pages/DashboardLayout/DashboardLayout')));
const AddProduct = Loadable(lazy(() => import('./Pages/DashboardLayout/AddProduct/AddProduct')));
const AllProducts = Loadable(lazy(() => import('./Pages/DashboardLayout/AllProducts/AllProducts')));
const Orders = Loadable(lazy(() => import('./Pages/DashboardLayout/Orders/Orders')));
const MediaLibrary = Loadable(lazy(() => import('./Pages/DashboardLayout/Medialibrary/Medialibrary')));
const Category = Loadable(lazy(() => import('./Pages/DashboardLayout/Category/Category')));
const Inventory = Loadable(lazy(() => import('./Pages/DashboardLayout/Inventory/Inventory')));
const DashBoradOverview = Loadable(lazy(() => import('./Pages/DashboardLayout/Overview/DashBoradOverview')));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "best-products", element: <BestProduct /> },
      { path: "best-products/:id", element: <ProductDetails /> },
      { path: "popular-product", element: <PorpularProduct /> },
      { path: "YourSpecialBrandProducts", element: <YourSpecialBrandProducts /> },
      { path: "product-list", element: <ProductList /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "ordersucces", element: <OrderSuccess /> },
      { path: "payment-failed", element: <PaymentFailed /> },
      { path: "compare", element: <Compare /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "order-tracking", element: <OrderTracking /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "return-policy", element: <ReturnPolicy /> },
      { path: "faq", element: <Faqs /> },
      { path: "flash-deals", element: <FlashDealsPage /> },
      { path: "blog-classic", element: <BlogClassicPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "products-category", element: <ProductsCategoryPage /> },
      { path: "product-brand", element: <ProductsBrands /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "my-accound",
        element: <Account />,
        children: [
          { index: true, element: <OverView /> },
          { path: "overview", element: <OverView /> },
          { path: "order-history", element: <OrderHistory /> },
          { path: "download", element: <DownLoad /> },
          { path: "return", element: <Return /> },
          { path: "profile", element: <PresonalInfo /> },
          { path: "address", element: <Address /> },
          { path: "wishlist", element: <WishList /> },
          { path: "reviews", element: <MyReviews /> },
          { path: "password", element: <ChangePasswordForm /> },
        ]
      },
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashBoradOverview /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products", element: <AllProducts /> },
      { path: "categories", element: <Category /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'media', element: <MediaLibrary /> },
      { path: 'orders', element: <Orders /> },
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