import { useParams } from "react-router";
import SpecialBrandProducts from "../../Components/SpecialBrandProducts"
import YourSpecialBrandProductsDetails from "../YourSpecialBrandProductsDetails/YourSpecialBrandProductsDetails"


const YourSpecialBrandProducts = () => {
    const {id} = useParams();
  return (
    <div>
       
       {id ? <YourSpecialBrandProductsDetails id={id} /> : <SpecialBrandProducts />}
        
        
    </div>
  )
}

export default YourSpecialBrandProducts