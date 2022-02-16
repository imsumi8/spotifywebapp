export const getItem = (data) => {
  return {
    type: "GET_ITEM",
    data: data,
  };
};

export const dropItem = (data) => {
  return {
    type: "DROP_ITEM",
    data: data,
  };
};
