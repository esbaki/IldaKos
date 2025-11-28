
import { useParams } from "react-router-dom";

import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
  const {id} = useParams();
 
  const {data, isLoading} = useFetchProductDetailsQuery(id ? +id : 0);

  if (isLoading) return <div>loading...</div>
  if(!data) return <div>no data yarraaam</div>

  const productDetails = [
    {label:"Name", value: data.name},
    {label:"Description", value: data.description},
    {label:"Type", value: data.type},
    {label:"Brand", value: data.brand},
    {label:"Quantity in stock", value: data.quantityInStock},
  ]



  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={data.pictureUrl}
          alt={data.name}
          style={{ width: "100%" }}
        ></img>
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{data.name}</Typography>
        <Divider sx={{ mb: 2 }}></Divider>
        <Typography variant="h4" color="secondary">
          ${(data.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{"& td":{fontSize:"1rem"}}}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight:"bold"}}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity :"
              fullWidth
              defaultValue={0}
            ></TextField>
          </Grid2>
          <Grid2 size={6}>
            <Button color="primary" size="large" variant="contained" fullWidth sx={{height:"55px"}}>
              Add to Basket
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}


 // const { id } = useParams();
  // const [product, setProduct] = useState<Product | null>();

  // useEffect(() => {
  //   fetch(`https://localhost:7017/api/products/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data))
  //     .catch((err) => console.log(err + " Product Details line 10"));
  // }, [id]);