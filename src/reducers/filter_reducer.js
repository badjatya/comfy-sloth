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

    default:
      return { ...state };
  }
};

export default filter_reducer;
