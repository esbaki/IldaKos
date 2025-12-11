import { Grid2, Typography } from "@mui/material";
import { useFetchCartQuery } from "./cartApi"
import CartItem from "./CartItem";
import OrderSummary from "../../app/shared/OrderSummary";


export default function CartPage() {
  const {data, isLoading} = useFetchCartQuery();
  
  const subtotal = data?.items.reduce((sum, current)=> sum + (current.price * current.quantity), 0) || 0;
  
  let deliveryFee =   subtotal > 10000 ? 0 : 500;
  if (subtotal == 0) {
    deliveryFee = 0;
  }

  if (isLoading) return <Typography>Loading...</Typography>
  if (!data || data.items.length === 0) return <Typography variant="h3">Your cart is empty</Typography>
  return (
    <>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
              {data.items.map(i => 
              <CartItem item = {i} key = {i.productId} ></CartItem>)}
          </Grid2>
          <Grid2 size={4}>
            <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee}></OrderSummary>
          </Grid2>
        </Grid2>
        <ul>
           
        </ul>
    </>
  )
}