import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { addToCart, removeFromCart } from "../../feature/cart-slice";
import { useNavigate } from "react-router-dom";

function calculateSubtotal(cartItem) {
  return cartItem.reduce(
    (sum, { product, quantity }) => product.price * quantity + sum,
    0
  );
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.value);

  const subtotal = calculateSubtotal(cart)?.toFixed(2);

  function updateQuantity(e, { product, quantity }) {
    const updatedQuantity = e.target.value;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  }
  return (
    <Container
      sx={{
        py: 8,
      }}
    >
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, image, price } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(250px, 25%) 1fr",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      objectFit: "contain",
                      padding: "1rem",
                      background: "white",
                    }}
                    alt={`${title} Image`}
                  />
                  <CardContent
                    sx={{
                      display: "grid",
                      placeItems: "flex-start",
                      alignItems: "center",
                      gridTemplateColumns: "1fr minmax(100px,10%)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {title}
                      </Typography>
                      <form>
                        <TextField
                          label="Quantity"
                          value={quantity}
                          onChange={(e) =>
                            updateQuantity(e, { product, quantity })
                          }
                          sx={{
                            width: "1.5rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          type="number"
                          id={`${id}-product-id`}
                          variant="standard"
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h6" paragraph>
                        ${price?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Card
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5">Subtotal</Typography>
              <Typography variant="h6">₹ {subtotal}</Typography>
              {subtotal > 0 ? (
                <Button
                  variant="contained"
                  onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={() => navigate("/")}>
                  Shop Products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
