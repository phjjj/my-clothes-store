import OrderService from "../Services/OrderService.js";

const postOrder = async (req, res) => {
  try {
    const order = req.body;

    const userId = req.user.uid;
    const newOrder = await OrderService.createOrder(order, userId);
    res.status(201).json({ message: "주문 완료", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "주문 실패", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.uid;
    const orders = await OrderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "주문 조회 실패", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.uid;
    await OrderService.cancelOrder(orderId, userId);
    res.status(200).json({ message: "주문 취소 완료" });
  } catch (error) {
    res.status(500).json({ message: "주문 취소 실패", error: error.message });
  }
};

export { postOrder, getOrders, deleteOrder };
