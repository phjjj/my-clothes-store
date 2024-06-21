import CartModel from "../Models/CartModel.js";

const addCartItem = async (userId, productId, quantity) => {
  return await CartModel.addToCart(userId, productId, quantity);
};

const getCartItemsByUserId = async (userId) => {
  return await CartModel.getCartItemsByUserId(userId);
};

const removeCartItem = async (cartItemId, userId) => {
  return await CartModel.removeCartItem(cartItemId, userId);
};

export default { addCartItem, getCartItemsByUserId, removeCartItem };
