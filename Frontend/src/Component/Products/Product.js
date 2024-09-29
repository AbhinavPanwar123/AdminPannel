import React, { useState, useEffect } from "react";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import Layout from "../Layout/Layout";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/products");
        setProductData(response.data.products);
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Layout pageTitle="Product List">
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productData.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
              >
                <img
                  className="w-full h-48 object-contain bg-gray-200 dark:bg-gray-700"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)}...`
                        : product.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold mb-4">Price: ${product.price}</p>
                    <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;
