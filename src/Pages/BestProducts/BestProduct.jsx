import { useParams } from "react-router";
import ProductsCard from "../../Components/Shear/ProductsCard";
import ProductDetails from "../ProductDetails/ProductDetails";


const BestProduct = () => {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        
        <ProductDetails id={id} />
      ) : (
      
        <ProductsCard />
      )}
    </div>
  );
};

export default BestProduct;