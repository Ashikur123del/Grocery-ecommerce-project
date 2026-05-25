import BardenLogo from "../../Components/BardenLogo"
import BlogSection from "../../Components/BlogSection"
import FarmingWatch from "../../Components/FarmingWatch"
import FlashSale from "../../Components/FlashSale"
import PopularProduct from "../../Pages/PopularProducts/PorpularProduct"
import FridayGrocery from "../../Components/Shear/FridayGrocery"
import GroceryItem from "../../Components/Shear/GroceryItem"
import HeroSlider from "../../Components/Shear/HeroSlider"

import Testimonials from "../../Components/testimonials"
import YourOrder from "../../Components/YourOrder"
import BestProduct from "../BestProducts/BestProduct"
import YourSpecialBrandProducts from "../YourSpecialBrandProducts/YourSpecialBrandProducts"

const Home = () => {
  return (
    <div className="">
      <HeroSlider />
      <GroceryItem />
      <FridayGrocery />
      <BestProduct />
      <FlashSale />
      <PopularProduct/>
      <BardenLogo />
      <YourSpecialBrandProducts />
      <FarmingWatch />
      <YourOrder />
      <Testimonials />
      <BlogSection />
    </div>
  )
}

export default Home