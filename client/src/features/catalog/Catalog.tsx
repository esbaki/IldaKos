import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product";

import ProductList from "./ProductList";



export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://localhost:7017/api/products");
          const responseData = await response.json();
          setProducts(responseData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProducts();
    }, []);


  return (
    <div>
      <ProductList products={products}></ProductList>
      
    </div>
  );
}


// type Props = {
//   products: Product[];
// };