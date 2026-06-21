import { useEffect } from "react";
import ProductsCard from "../../Components/Shear/ProductsCard";
import { useBoundStore } from "../../store/useBoundStore";
import PageBanner from "../../Components/Shear/Pagebanner";



const BlogClassicPage = () => {
     const { products, fetchProducts } = useBoundStore();
    
      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
    
  return (
    <>
    <PageBanner title="Blog Classic" breadcrumbs={[{ label: "Blog" }]} />
        <div className="container mx-auto py-10 ">
        <ProductsCard products={products} /> 
    </div>
    </>
    
  )
}

export default BlogClassicPage