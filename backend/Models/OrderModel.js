import { queryDB } from "../db/queryDB.js";

const createOrder = async (order, userId) => {
  const query = `
    INSERT INTO orders (user_id, total_price, status, shipping_address, shipping_phone)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    userId,
    order.total_price,
    order.status,
    order.shipping_address,
    order.shipping_phone,
  ];
  return await queryDB(query, values);
};

const addOrderItem = async (orderId, productId, quantity) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  const values = [orderId, productId, quantity];
  return await queryDB(query, values);
};

const getOrdersByUserId = async (userId) => {
  // order_items테이블과 products테이블을 조인하여 주문 상품 정보를 가져옴
  // 주문 상품 정보에는 상품 이름, 수량, 가격, 이미지 URL이 포함
  const query = `
    SELECT
      orders.id AS order_id,
      orders.created_at,
      orders.total_price,
      orders.status,
      order_items.product_id,
      order_items.quantity,
      products.title,
      products.price,
      pi.image_url AS product_image
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN products ON order_items.product_id = products.id
      LEFT JOIN (
        SELECT
          product_id,
          MIN(image_url) AS image_url
        FROM product_images
        GROUP BY product_id
      ) AS pi ON order_items.product_id = pi.product_id
       WHERE orders.user_id = ?
       `;

  const values = [userId];
  return await queryDB(query, values);
};

const getOrderItemsByOrderId = async (orderId) => {
  const query = `SELECT * FROM order_items WHERE order_id = ?`;
  const values = [orderId];
  return await queryDB(query, values);
};

const cancelOrder = async (orderId, userId) => {
  // 먼저, order_items 테이블에서 해당 주문 ID에 해당하는 모든 행을 삭제
  const deleteOrderItemsQuery = `DELETE FROM order_items WHERE order_id = ?`;
  await queryDB(deleteOrderItemsQuery, [parseInt(orderId)]);

  // 그 다음, orders 테이블에서 주문을 삭제
  const deleteOrderQuery = `DELETE FROM orders WHERE id = ? AND user_id = ?`;
  const values = [parseInt(orderId), userId];
  return await queryDB(deleteOrderQuery, values);
};

export default {
  createOrder,
  addOrderItem,
  getOrdersByUserId,
  getOrderItemsByOrderId,
  cancelOrder,
};
