import BardenLogo from "../../Components/BardenLogo"
import BlogSection from "../../Components/BlogSection"
import FarmingWatch from "../../Components/FarmingWatch"
import FlashSale from "../../Components/FlashSale"
import PopularProducts from "../../Components/PopularProducts"
import FridayGrocery from "../../Components/Shear/FridayGrocery"
import GroceryItem from "../../Components/Shear/GroceryItem"
import HeroSlider from "../../Components/Shear/HeroSlider"
import SpecialBrandProducts from "../../Components/SpecialBrandProducts"
import Testimonials from "../../Components/testimonials"
import YourOrder from "../../Components/YourOrder"
import BestProduct from "../BestProducts/BestProduct"

const Home = () => {
  return (
    <div className="">
      <HeroSlider />
      <GroceryItem />
      <FridayGrocery />
      <BestProduct />
      <FlashSale />
      <PopularProducts />
      <BardenLogo />
      <SpecialBrandProducts />
      <FarmingWatch />
      <YourOrder />
      <Testimonials />
      <BlogSection />
    </div>
  )
}

export default Home