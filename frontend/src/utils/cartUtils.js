export const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // calculate shipping price (id order price is less than 500 else free,else 80rs for shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 80);

  // calculate item tax
  state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2));
  // calculate  total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
