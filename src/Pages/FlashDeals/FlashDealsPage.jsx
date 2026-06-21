import { useEffect } from "react";
import { useBoundStore } from "../../store/useBoundStore";
import ProductsCard from "../../Components/Shear/ProductsCard";
import FlashDealsHeader from "../../Components/FlashDealsHeader/FlashDealsHeader";


const FlashDealsPage = () => {
  const { products, fetchProducts } = useBoundStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="container mx-auto py-12 px-4">
      <FlashDealsHeader />
      
      <ProductsCard products={products} /> 
    </section>
  );
};

export default FlashDealsPage;