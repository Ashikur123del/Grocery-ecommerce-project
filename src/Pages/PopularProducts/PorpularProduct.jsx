import { useParams } from "react-router";
import PopularProducts from "../../Components/PopularProducts"
import PorpularProductDetails from "../PorpularProductDetails/PorpularProductDetails";

const PorpularProduct = () => {
     const { id } = useParams();
  return (
    <div>
           {id ? (<PorpularProductDetails id={id}/>) : (
             <PopularProducts/>
           )}
    </div>
  )
}

export default PorpularProduct