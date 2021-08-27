import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        filtered_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SORT_PRODUCTS:
      let tempSortProducts = [...state.filtered_products];

      if (state.sort === "price-lowest") {
        tempSortProducts = tempSortProducts.sort((a, b) => a.price - b.price);
      } else if (state.sort === "price-highest") {
        tempSortProducts = tempSortProducts.sort((a, b) => b.price - a.price);
      } else if (state.sort === "name-a") {
        tempSortProducts = tempSortProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (state.sort === "name-z") {
        tempSortProducts = tempSortProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filtered_products: tempSortProducts,
      };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempFilterProducts = [...all_products];

      // Search
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      // category
      if (category !== "all") {
        tempFilterProducts = tempFilterProducts.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== "all") {
        tempFilterProducts = tempFilterProducts.filter(
          (product) => product.company === company
        );
      }
      // colors
      if (color !== "all") {
        tempFilterProducts = tempFilterProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      // price
      tempFilterProducts = tempFilterProducts.filter(
        (product) => product.price <= price
      );
      // shipping
      if (shipping) {
        tempFilterProducts = tempFilterProducts.filter(
          (product) => product.shipping === true
        );
      }
      return {
        ...state,
        filtered_products: tempFilterProducts,
      };

    default:
      return { ...state };
  }
};

export default filter_reducer;
