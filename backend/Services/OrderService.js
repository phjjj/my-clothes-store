import OrderModel from "../Models/OrderModel.js";
import CartModel from "../Models/CartModel.js";

const createOrder = async (order, userId) => {
  const newOrder = await OrderModel.createOrder(order, userId);

  // items 배열의 각 요소는 {product_id, quantity} 형태의 배열
  // items 배열의 각 요소를 반복하면서 addOrderItem 함수를 호출
  // addOrderItem 함수는 주문 ID, 상품 ID, 수량을 인자로 받아서 order_items 테이블에 새로운 주문 상품을 추가
  for (const item of order.items) {
    await OrderModel.addOrderItem(
      newOrder.insertId,
      item.productId,
      item.quantity
    );
  }

  // 장바구니에 있는 상품을 주문한 경우, 장바구니에서 해당 상품을 삭제
  for (const item of order.items) {
    await CartModel.removeCartItemByProductId(item.productId, userId);
  }

  return newOrder;
};

const getOrdersByUserId = async (userId) => {
  return await OrderModel.getOrdersByUserId(userId);
};

const getOrderItemsByOrderId = async (orderId) => {
  return await OrderModel.getOrderItemsByOrderId(orderId);
};

const cancelOrder = async (orderId, userId) => {
  return await OrderModel.cancelOrder(orderId, userId);
};

export default {
  createOrder,
  getOrdersByUserId,
  getOrderItemsByOrderId,
  cancelOrder,
};
