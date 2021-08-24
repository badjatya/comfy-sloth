import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();

  // if There is no products
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  // If GridView is false than ListView Will be Shown
  if (grid_view === false) {
    return <ListView products={products} />;
  }

  return <GridView products={products} />;
};

export default ProductList;
