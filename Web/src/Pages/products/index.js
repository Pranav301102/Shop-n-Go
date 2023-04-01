import React from "react";
import { ShoppingCartRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cart-slice";
import { fetchAllProducts } from "../../feature/product-slice";
import Loader from "../../Components/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);
  console.log(state);
  const { value: products, loading } = state ?? {};

  const addProductToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }
  return (
    <Container maxWidth="lg">
      <Grid sx={{ py: "1.5rem" }} container>
        {products?.map(
          ({
            Prod_Name: title,
            Prod_ID: id,
            Prod_Image: image,
            Prod_Price: price,
          }) => (
            <Grid item key={id} xs={12} sm={6} md={3} spacing={"1rem"}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  marginTop: "1rem",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    alignSelf: "center",
                    objectFit: "contain",
                    background: "white",
                  }}
                  image={image}
                  alt={`${title} Image`}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography gutterBottom paragraph>{`₹ ${price}`}</Typography>
                </CardContent>
                <CardActions sx={{ alignSelf: "center" }}>
                  <Button
                    size="medium"
                    onClick={() =>
                      addProductToCart({
                        title,
                        id,
                        image,
                        price,
                      })
                    }
                  >
                    <ShoppingCartRounded />
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      {loading && <Loader />}
    </Container>
  );
};

export default Products;
