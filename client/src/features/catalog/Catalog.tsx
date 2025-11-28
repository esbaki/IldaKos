
import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {
 const {data, isLoading} = useFetchProductsQuery();

 if(!data ) return <div>no data yarraaam</div>
 if(isLoading) return <div>loading...</div>
  

  return (
    <div>
      <ProductList products={data}></ProductList>
      
    </div>
  );
}


// type Props = {
//   products: Product[];
// };

 // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await fetch("https://localhost:7017/api/products");
  //         const responseData = await response.json();
  //         setProducts(responseData);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);