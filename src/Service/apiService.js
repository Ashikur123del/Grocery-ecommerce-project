export const fetchAllProducts = async () => {
  const response = await fetch("/data.json");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchProductById = async (id) => {
  const products = await fetchAllProducts();
  return products.find((p) => (p.id) === (id)) ?? null;
};