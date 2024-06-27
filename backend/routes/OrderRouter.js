// routes/users.js
import express from "express";
import {
  getOrders,
  deleteOrder,
  postOrder,
} from "../controllers/OrderController.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const OrderRouter = express.Router();

OrderRouter.route("/")
  .get(authenticateJWT, getOrders)
  .post(authenticateJWT, postOrder);
OrderRouter.route("/:id").delete(authenticateJWT, deleteOrder);

export default OrderRouter;
