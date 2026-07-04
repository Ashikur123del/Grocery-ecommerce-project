import { Outlet } from "react-router";
import MyAccounds from "../../Components/MyAccounds/MyAccounds"; // আপনার সাইডবার কম্পোনেন্ট
import PageBanner from "../../Components/Shear/Pagebanner";

const Account = () => {
  return (
   <div className="bg-slate-100">
   <PageBanner title="My Account" breadcrumbs={[{ label: "Account" }]} />
    <div className="container mx-auto p-4 md:p-8 flex gap-6">
      
      <div className="hidden lg:block w-64 shrink-0">
        <MyAccounds />
      </div>
      
  
      <div className="flex-1">
        <main>
          <Outlet /> 
        </main>
      </div>
      
    </div>
   
   </div>
  );
};

export default Account;