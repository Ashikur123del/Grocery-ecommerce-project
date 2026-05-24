import { useParams } from "react-router";
import ProductsCard from "../../Components/Shear/ProductsCard";
import ProductDetails from "../ProductDetails/ProductDetails";


const BestProduct = () => {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        // যদি URL-এ id থাকে, তবে ডিটেইলস পেজ দেখাও
        <ProductDetails id={id} />
      ) : (
        // id না থাকলে আগের মতো লিস্ট দেখাও
        <ProductsCard />
      )}
    </div>
  );
};

export default BestProduct;