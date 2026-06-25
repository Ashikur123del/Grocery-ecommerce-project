import { useEffect, useState } from "react";
import { useBoundStore } from "../../../store/useBoundStore";
import ProductsCard from "../../../Components/Shear/ProductsCard";
import { Pagination } from "@heroui/react";

const WishList = () => {
    const { products, fetchProducts } = useBoundStore();
    const [page, setPage] = useState(1);
    const itemsPerPage = 6; 

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <section className="container mx-auto py-12 px-4">
            <ProductsCard 
                products={currentProducts} 
                columns={3} 
                showAddToCartButton={false}
            /> 

           <div className="flex justify-center items-center">
              {totalPages > 1 && (
                <nav aria-label="pagination" className="flex justify-center items-center mt-10">
                    <Pagination>
                        <Pagination.Content className="gap-2">
                            
                            {/* Previous Button */}
                            <Pagination.Item>
                                <Pagination.Previous 
                                    isDisabled={page === 1} 
                                    onPress={() => setPage(p => Math.max(1, p - 1))}
                                >
                                    <Pagination.PreviousIcon />
                                </Pagination.Previous>
                            </Pagination.Item>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <Pagination.Item key={p}>
                                    <Pagination.Link 
                                        isActive={p === page} 
                                        onPress={() => setPage(p)}
                                        className={p === page ? "bg-[#00A859] text-white" : ""}
                                    >
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            ))}

                            {/* Next Button */}
                            <Pagination.Item>
                                <Pagination.Next 
                                    isDisabled={page === totalPages} 
                                    onPress={() => setPage(p => Math.min(totalPages, p + 1))}
                                >
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>

                        </Pagination.Content>
                    </Pagination>
                </nav>
            )}
           </div>
          
        </section>
    );
};

export default WishList;