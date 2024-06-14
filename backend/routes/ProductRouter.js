// routes/users.js
import express from "express";

const ProductRouter = express.Router();
// 상품 전체 조회
/**
 * @swagger
 * /api/products:
 *  post:
 *     summary: 상품 전체 조회
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

//상품 상세 조회
/**
 * @swagger
 * /api/products/:id:
 */

export default ProductRouter;
