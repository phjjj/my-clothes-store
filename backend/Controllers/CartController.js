import CartService from "../Services/CartService.js";

// 장바구니에 상품 추가
const postCartItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user = req.user;
    const userId = user.uid;

    await CartService.addCartItem(userId, product_id, quantity);

    res.status(201).json({ message: "장바구니에 추가 완료" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "장바구니에 추가 실패", error: error.message });
  }
};

// 장바구니 조회
const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.uid;

    const cartItems = await CartService.getCartItemsByUserId(userId);

    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "장바구니 조회 실패", error: error.message });
  }
};

// 장바구니 항목 삭제
const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const user = req.user;
    const userId = user.uid;

    await CartService.removeCartItem(cartItemId, userId);
    res.status(200).json({ message: "장바구니 항목 삭제 완료" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "장바구니 항목 삭제 실패", error: error.message });
  }
};

export { postCartItem, getCartItems, deleteCartItem };
