import { useEffect } from "react";
import PageBanner from "../../Components/Shear/Pagebanner";
import { useBoundStore } from "../../store/useBoundStore";
import ProductsCategory from "../../Components/ProductsCategory";

const ProductsCategoryPage = () => {

  const { products, fetchProducts } = useBoundStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="">
      <PageBanner title="Product Category" breadcrumbs={[{ label: "Product" }]} />

        <div className="container mx-auto py-10 md:py-20">
        <div className="grid grid-cols-6 gap-4">
        
        {products && products.map((product) => (
          <ProductsCategory key={product.id} product={product} />
        ))}
      </div>
        </div>
    </div>
  );
};

export default ProductsCategoryPage;