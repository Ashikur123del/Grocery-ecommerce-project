
const OrderCreate = () => {
    const products = [
        {id:1, name: "Apple", title: "best organice", des: "best product of china"},
        {id:1, name: "Apple", title: "best organice", des: "best product of china"},
        {id:1, name: "Apple", title: "best organice", des: "best product of china"},
        
    ]

 const uniqueProducts = products.filter((value, index, self) => {
    return index === self.findIndex((t) => t.id === value.id);
});
       
    
    console.log(uniqueProducts);

  return (
    <div>
        {uniqueProducts.map((item) => (
           <div className="" key={item.id}>
             <p>{item.name}</p>
            <p>{item.title}</p>
           </div>
        ))}
    </div>
  )
}

export default OrderCreate