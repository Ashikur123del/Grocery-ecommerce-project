import { useParams } from "react-router";
import { useEffect } from "react";
import ProductsCard from "../../Components/Shear/ProductsCard";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";
import { useBoundStore } from "../../store/useBoundStore";


const BestProduct = () => {
  const { id } = useParams();
  const { fetchProducts, isLoading } = useBoundStore();

  useEffect(() => {
    fetchProducts(); // isLoaded cache থাকলে skip করবে
  }, [fetchProducts]);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return <div>{id ? <ProductDetails id={id} /> : <ProductsCard />}</div>;
};

export default BestProduct;