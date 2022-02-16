const initialState = { data: [] };
const featuredList = (state = initialState, { type, data }) => {
  console.log(data, "datashow");
  switch (type) {
    case "GET_ITEM":
      return { ...state, data };
    case "DROP_ITEM":
      return { ...state, data };
    default:
      return state;
  }
};

export default featuredList;
