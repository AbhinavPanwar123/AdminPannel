import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import Layout from "../Layout/Layout";

const Product = () => {
  const [productData, setProductData] = useState([]);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProductData(response.data.products); // Update the state with fetched products
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Layout pageTitle="Product List">
      <Grid container spacing={3}>
        {productData.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Price: ${product.price}
                </Typography>
                <Button variant="contained" fullWidth>
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Product;
