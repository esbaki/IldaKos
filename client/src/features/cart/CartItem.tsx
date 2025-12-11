import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddCartItemMutation, useRemoveCartItemMutation } from "./cartApi";
import type { Item } from "../../app/models/cart";
import { currencyFormat } from "../../lib/util";

type Props = {
  item: Item; 
};

export default function CartItem({ item }: Props) {

      const [addCartItem] = useAddCartItemMutation();
      const [removeCartItem] = useRemoveCartItemMutation();
  
  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "4px",
            mr: 8,
            ml: 4,
          }}
        ></Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6"> {item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }}>
              {currencyFormat(item.price)} x {item.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} color="primary">
              {currencyFormat((item.price*item.quantity))}
            </Typography>
          </Box>
          <Grid2 container spacing={1} alignItems="center">
            <IconButton
              color="error"
              size="small"
              sx={{ borkarekodder: 1, borderRadius: 1, minWidth: 0 }}
              onClick={()=> removeCartItem({productId: item.productId, quantity:1})}
            >
              <Remove></Remove>
            </IconButton>

            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
              onClick={()=> addCartItem({product:item, quantity:1})}
            >
              <Add></Add>
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton
        color="error"
        size="small"
        sx={{ border: 1, borderRadius: 1, minWidth: 0, alignSelf: "start", mr:1, mt:1
         }}
        onClick={()=> removeCartItem({productId:item.productId, quantity: item.quantity})} 
      >
        <Close></Close>
      </IconButton>
    </Paper>
  );
}
