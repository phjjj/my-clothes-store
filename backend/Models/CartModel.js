import { queryDB } from "../db/queryDB.js";

const addToCart = async (userId, productId, quantity) => {
  // 먼저 해당 상품이 장바구니에 존재하는지 확인
  const checkQuery = `
    SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?
  `;
  const checkValues = [userId, productId];
  const existingItems = await queryDB(checkQuery, checkValues);

  if (existingItems.length > 0) {
    // 이미 존재하는 경우, 수량 업데이트
    const updateQuery = `
      UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?
    `;
    const updateValues = [quantity, userId, productId];

    return await queryDB(updateQuery, updateValues);
  } else {
    // 존재하지 않는 경우, 새로운 항목 추가
    const insertQuery = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    const insertValues = [userId, productId, quantity];
    return await queryDB(insertQuery, insertValues);
  }
};

const getCartItemsByUserId = async (userId) => {
  const query = `
    SELECT 
    cart_items.id, 
    cart_items.product_id, 
    title, 
    quantity, 
    price, 
    pi.image_url AS product_image
    FROM ClothesShop.cart_items
LEFT JOIN products ON cart_items.product_id = products.id
LEFT JOIN (
    SELECT 
        product_id, 
        MIN(image_url) AS image_url
    FROM product_images
    GROUP BY product_id
) AS pi ON cart_items.product_id = pi.product_id
  `;
  const values = [userId];
  return await queryDB(query, values);
};

const removeCartItem = async (cartItemId, userId) => {
  const query = `DELETE FROM cart_items WHERE id = ? AND user_id = ?`;
  const values = [parseInt(cartItemId), userId];
  const result = await queryDB(query, values);
  return result;
};

export default { addToCart, getCartItemsByUserId, removeCartItem };
