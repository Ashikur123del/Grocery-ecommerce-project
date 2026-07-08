/* eslint-disable react-refresh/only-export-components */

import { lazy, Suspense } from 'react';
import './index.css';
import { createBrowserRouter } from "react-router";
import { Spinner } from '@heroui/react';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="flex flex-col items-center gap-2">
        <Spinner color="success" size="xl"/>  Loading...
    </div>
  </div>
);


// General Pages
const Root = lazy(() => import('./Layout/Root'));
const Home = lazy(() => import('./Pages/HomePage/Home'));
const BestProduct = lazy(() => import('./Pages/BestProducts/BestProduct'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails/ProductDetails'));
const PorpularProduct = lazy(() => import('./Pages/PopularProducts/PorpularProduct'));
const YourSpecialBrandProducts = lazy(() => import('./Pages/YourSpecialBrandProducts/YourSpecialBrandProducts'));
const ProductList = lazy(() => import('./Pages/ProductList/ProductList'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const OrderSuccess = lazy(() => import('./Pages/OrderSuccesPage/OrderSucces'));
const PaymentFailed = lazy(() => import('./Pages/PaymentFailed/PaymentFailed'));
const Compare = lazy(() => import('./Pages/Compare/Compare'));
const Wishlist = lazy(() => import('./Pages/Wishlist/Wishlist'));
const OrderTracking = lazy(() => import('./Pages/OrderTracking/OrderTracking'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/PrivacyPolicy'));
const TranOfService = lazy(() => import('./Pages/TranOfService/TranOfService'));
const ReturnPolicy = lazy(() => import('./Pages/ReturnPolicy/ReturnPolicy'));
const Faqs = lazy(() => import('./Pages/FAQs/Faqs'));
const FlashDealsPage = lazy(() => import('./Pages/FlashDeals/FlashDealsPage'));
const BlogClassicPage = lazy(() => import('./Pages/BlogClassic/BlogClassicPage'));
const AboutPage = lazy(() => import('./Pages/About/AboutPage'));
const SignIn = lazy(() => import('./Pages/SignIn/SignIn'));
const SignUp = lazy(() => import('./Pages/SignUp/SignUp'));
const ProductsCategoryPage = lazy(() => import('./Pages/ProductsCategory/ProductsCategoryPage'));
const ProductsBrands = lazy(() => import('./Pages/ProductBrand/ProductsBrands'));
const ContactPage = lazy(() => import('./Pages/Contact/ContactPage'));

// Shop User Account Pages
const Account = lazy(() => import("./Pages/MyAccound/Accound"));
const OverView = lazy(() => import("./Pages/MyAccound/OverViewPage/OverView"));
const OrderHistory = lazy(() => import('./Pages/MyAccound/OrderHistory/OrderHistory'));
const DownLoad = lazy(() => import("./Pages/MyAccound/MyDownload/DownLoad"));
const Return = lazy(() => import("./Pages/MyAccound/ReturnRequest/Return"));
const PresonalInfo = lazy(() => import('./Pages/MyAccound/PresonalInfo/PresonalInfo'));
const Address = lazy(() => import('./Pages/MyAccound/Address/Address'));
const WishList = lazy(() => import('./Pages/MyAccound/WishList/WishList'));
const MyReviews = lazy(() => import('./Pages/MyAccound/MyReviews/MyReviews'));
const ChangePasswordForm = lazy(() => import('./Pages/MyAccound/ChangePasswordForm/ChangePasswordForm'));
const PromoCoupon = lazy(() => import('./Pages/MyAccound/PromoCoupon/PromoCoupon'));
const Payment = lazy(() => import('./Pages/MyAccound/Payment/Payment'));
const SupportUser = lazy(() => import("./Pages/MyAccound/SupportUser/SupportUser"));
const ManageSpecialDay = lazy(() => import("./Pages/MyAccound/ManageSpecialDay/ManageSpecialDay"));
const BecomeAgent = lazy(() => import("./Pages/MyAccound/BecomeAgent/BecomeAgent"));
const DeleteAccount = lazy(() => import("./Pages/MyAccound/DeleteAccount/DeleteAccount"));

// Vendor Dashboard Pages
const DashboardLayout = lazy(() => import('./Pages/DashboardLayout/DashboardLayout'));
const AddProduct = lazy(() => import('./Pages/DashboardLayout/AddProduct/AddProduct'));
const AllProducts = lazy(() => import('./Pages/DashboardLayout/AllProducts/AllProducts'));
const Orders = lazy(() => import('./Pages/DashboardLayout/Orders/Orders'));
const MediaLibrary = lazy(() => import('./Pages/DashboardLayout/Medialibrary/Medialibrary'));
const Category = lazy(() => import('./Pages/DashboardLayout/Category/Category'));
const Customers = lazy(() => import('./Pages/DashboardLayout/Customers/Customers'));
const Coupons = lazy(() => import('./Pages/DashboardLayout/Coupons/Coupons'));
const Inventory = lazy(() => import('./Pages/DashboardLayout/Inventory/Inventory'));
const DashBoradOverview = lazy(() => import('./Pages/DashboardLayout/Overview/DashBoradOverview'));
const ReturnsOrder = lazy(() => import('./Pages/DashboardLayout/ReturnsOrder/ReturnsOrder'));
const Payments = lazy(() => import('./Pages/DashboardLayout/Payments/Payments'));
const Analytics = lazy(() => import('./Pages/DashboardLayout/Analytics/Analytics'));
const SupportTickets = lazy(() => import('./Pages/DashboardLayout/Supporttickets/Supporttickets'));
const StoreSettings = lazy(() => import('./Pages/DashboardLayout/Storesettings/Storesettings'));

// Super Admin Pages (New Additions)
const SuperAdminLayout = lazy(() => import('./Pages/SupperAdminLayout/SuperAdminLayout'));
const AdminDashboard = lazy(() => import('./Pages/SupperAdminLayout/AdminDashboard/AdminDashboard'));
const AdminAnalytics = lazy(() => import('./Pages/SupperAdminLayout/AdminAnalytics/AdminAnalytics'));
const AllStores = lazy(() => import("./Pages/SupperAdminLayout/AllStores/AllStores"));
const PendingApprovals = lazy(() =>  import("./Pages/SupperAdminLayout/PendingApprovals/PendingApprovals"));
const VendorsDirectory = lazy(() =>  import("./Pages/SupperAdminLayout/VendorsDirectory/VendorsDirectory"));
const DomainRequests = lazy(() =>  import("./Pages/SupperAdminLayout/DomainRequests/DomainRequests"));
const SubscriptionPlans = lazy(() =>  import("./Pages/SupperAdminLayout/SubscriptionPlans/SubscriptionPlans"));
// const VendorPayouts = lazy(() =>  import("./Pages/SupperAdminLayout/VendorPayouts/VendorPayouts"));
// const GlobalSalesLog = lazy(() =>  import("./Pages/SupperAdminLayout/GlobalSalesLog/GlobalSalesLog"));
// const SystemSettings = lazy(() =>  import("./Pages/SupperAdminLayout/SystemSettings/SystemSettings"));

const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

// Higher Order Component for Dynamic Suspense Fallback
const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component {...props} />
  </Suspense>
);

// Wrapping Components
const LRoot = Loadable(Root);
const LHome = Loadable(Home);
const LBestProduct = Loadable(BestProduct);
const LProductDetails = Loadable(ProductDetails);
const LPorpularProduct = Loadable(PorpularProduct);
const LYourSpecialBrandProducts = Loadable(YourSpecialBrandProducts);
const LProductList = Loadable(ProductList);
const LCart = Loadable(Cart);
const LCheckout = Loadable(Checkout);
const LOrderSuccess = Loadable(OrderSuccess);
const LPaymentFailed = Loadable(PaymentFailed);
const LCompare = Loadable(Compare);
const LWishlist = Loadable(Wishlist);
const LOrderTracking = Loadable(OrderTracking);
const LPrivacyPolicy = Loadable(PrivacyPolicy);
const LTranOfService = Loadable(TranOfService);
const LReturnPolicy = Loadable(ReturnPolicy);
const LFaqs = Loadable(Faqs);
const LFlashDealsPage = Loadable(FlashDealsPage);
const LBlogClassicPage = Loadable(BlogClassicPage);
const LAboutPage = Loadable(AboutPage);
const LSignIn = Loadable(SignIn);
const LSignUp = Loadable(SignUp);
const LProductsCategoryPage = Loadable(ProductsCategoryPage);
const LProductsBrands = Loadable(ProductsBrands);
const LContactPage = Loadable(ContactPage);

const LAccount = Loadable(Account);
const LOverView = Loadable(OverView);
const LOrderHistory = Loadable(OrderHistory);
const LDownLoad = Loadable(DownLoad);
const LReturn = Loadable(Return);
const LPresonalInfo = Loadable(PresonalInfo);
const LAddress = Loadable(Address);
const LWishList = Loadable(WishList);
const LMyReviews = Loadable(MyReviews);
const LChangePasswordForm = Loadable(ChangePasswordForm);
const LPromoCoupon = Loadable(PromoCoupon);
const LPayment = Loadable(Payment);
const LSupportUser = Loadable(SupportUser);
const LManageSpecialDay = Loadable(ManageSpecialDay);
const LBecomeAgent = Loadable(BecomeAgent);
const LDeleteAccount = Loadable(DeleteAccount);

const LDashboardLayout = Loadable(DashboardLayout);
const LAddProduct = Loadable(AddProduct);
const LAllProducts = Loadable(AllProducts);
const LOrders = Loadable(Orders);
const LMediaLibrary = Loadable(MediaLibrary);
const LCategory = Loadable(Category);
const LCustomers = Loadable(Customers);
const LCoupons = Loadable(Coupons);
const LInventory = Loadable(Inventory);
const LDashBoradOverview = Loadable(DashBoradOverview);
const LReturnsOrder = Loadable(ReturnsOrder);
const LPayments = Loadable(Payments);
const LAnalytics = Loadable(Analytics);
const LSupportTickets = Loadable(SupportTickets);
const LStoreSettings = Loadable(StoreSettings);

// Super Admin Loadable Elements
const LSuperAdminLayout = Loadable(SuperAdminLayout);
const LAdminDashboard  = Loadable(AdminDashboard);
const LAdminAnalytics = Loadable(AdminAnalytics);
const LAllStores = Loadable(AllStores);
const LPendingApprovals = Loadable(PendingApprovals);
const LVendorsDirectory = Loadable(VendorsDirectory);
const LDomainRequests = Loadable(DomainRequests);
const LSubscriptionPlans = Loadable(SubscriptionPlans);
// const LVendorPayouts = Loadable(VendorPayouts);
// const LGlobalSalesLog = Loadable(GlobalSalesLog);
// const LSystemSettings = Loadable(SystemSettings);

const LNotFound = Loadable(NotFound);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LRoot />,
    children: [
      { index: true, element: <LHome /> },
      { path: "best-products", element: <LBestProduct /> },
      { path: "best-products/:id", element: <LProductDetails /> },
      { path: "popular-product", element: <LPorpularProduct /> },
      { path: "YourSpecialBrandProducts", element: <LYourSpecialBrandProducts /> },
      { path: "product-list", element: <LProductList /> },
      { path: "cart", element: <LCart /> },
      { path: "checkout", element: <LCheckout /> },
      { path: "ordersucces", element: <LOrderSuccess /> },
      { path: "payment-failed", element: <LPaymentFailed /> },
      { path: "compare", element: <LCompare /> },
      { path: "wishlist", element: <LWishlist /> },
      { path: "order-tracking", element: <LOrderTracking /> },
      { path: 'privacy-policy', element: <LPrivacyPolicy /> },
      { path: 'terms-of-service', element: <LTranOfService /> },
      { path: "return-policy", element: <LReturnPolicy /> },
      { path: "faq", element: <LFaqs /> },
      { path: "flash-deals", element: <LFlashDealsPage /> },
      { path: "blog-classic", element: <LBlogClassicPage /> },
      { path: 'about', element: <LAboutPage /> },
      { path: "sign-in", element: <LSignIn /> },
      { path: "sign-up", element: <LSignUp /> }, 
      { path: "products-category", element: <LProductsCategoryPage /> },
      { path: "product-brand", element: <LProductsBrands /> },
      { path: "contact", element: <LContactPage /> },
      {
        path: "my-accound",
        element: <LAccount />,
        children: [
          { index: true, element: <LOverView /> },
          { path: "overview", element: <LOverView /> },
          { path: "order-history", element: <LOrderHistory /> },
          { path: "download", element: <LDownLoad /> },
          { path: "return", element: <LReturn /> },
          { path: "profile", element: <LPresonalInfo /> },
          { path: "address", element: <LAddress /> },
          { path: "wishlist", element: <LWishList /> },
          { path: "reviews", element: <LMyReviews /> },
          { path: "password", element: <LChangePasswordForm /> },
          { path: 'promocoupon', element: <LPromoCoupon />},
          { path: 'payment', element: <LPayment />},
          { path: "supportuser", element: < LSupportUser />},
          { path: 'managespecialday', element: < LManageSpecialDay />},
          { path: "becomeagent", element: <LBecomeAgent />},
          { path: "deleteaccount", element: <LDeleteAccount />}
        ]
      },
    ]
  }, 
  {
    path: "/dashboard",
    element: <LDashboardLayout />,
    children: [
      { index: true, element: <LDashBoradOverview /> },
      { path: "add-product", element: <LAddProduct /> },
      { path: "products", element: <LAllProducts /> },
      { path: "categories", element: <LCategory /> },
      { path: 'inventory', element: <LInventory /> },
      { path: 'media', element: <LMediaLibrary /> },
      { path: 'orders', element: <LOrders /> },
      { path: 'returns', element: <LReturnsOrder /> },
      { path: 'customers', element: <LCustomers /> },
      { path: 'coupons', element: <LCoupons /> },
      { path: 'payments', element: <LPayments /> },
      { path: "reports", element: <LAnalytics /> },
      { path: 'support', element: <LSupportTickets /> },
      { path: 'store-settings', element: <LStoreSettings /> }
    ]
  },
  {
    path: "/supper-admin",
    element: <LSuperAdminLayout />,
    children: [
      { index: true, element: <LAdminDashboard /> },
      { path: "analytics", element: <LAdminAnalytics /> },
      { path: "stores", element: <LAllStores /> },
      { path: "pending-stores", element: <LPendingApprovals  /> },
      { path: "vendors", element: <LVendorsDirectory /> },
      { path: "custom-domains", element: <LDomainRequests /> },
      { path: "plans", element: <LSubscriptionPlans /> },
      // { path: "payouts", element: <LVendorPayouts/> },
      // { path: "transactions", element: <LGlobalSalesLog /> },
      // { path: "settings", element: <LSystemSettings /> }
    ]
  },
  {
    path: "*",
    element: <LNotFound />
  }
]);



