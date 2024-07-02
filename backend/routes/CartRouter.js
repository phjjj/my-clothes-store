import express from "express"
import { postCartItem, getCartItems, deleteCartItem } from "../controllers/CartController.js"
import authenticateJWT from "../middleware/authMiddleware.js"

const CartRouter = express.Router()

CartRouter.post("/", authenticateJWT, postCartItem)
CartRouter.get("/", authenticateJWT, getCartItems)
CartRouter.delete("/:id", authenticateJWT, deleteCartItem)

export default CartRouter
