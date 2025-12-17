import { Grid2, Typography } from "@mui/material";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData} = useFetchFiltersQuery();
  
  const dispatch = useAppDispatch();

  if (!data) return <div>no data yarraaam</div>;
  if (isLoading) return <div>loading...</div>;
  if (!filtersData) return <div>filteeers</div>
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData = {filtersData}></Filters>
      </Grid2>
      <Grid2 size={9}>
        
          {data.items && data.items.length > 0 ? (
            <>
            <ProductList products={data.items}></ProductList>
          <AppPagination
            pagination={data.pagination}
            onPageChange={(page: number) => {
              dispatch(setPageNumber(page));
              window.scrollTo({top:0,behavior:"smooth"})
            }
              }
          ></AppPagination>
            </>
          ) : (
            <Typography variant="h5">
              No mathces.
            </Typography>
          )}
      </Grid2>
    </Grid2>
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
