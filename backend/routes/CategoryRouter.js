import express from "express"
import { allCategory } from "../Controllers/CategoryController.js"

const CategoryRouter = express.Router()

CategoryRouter.get("/", allCategory)

export default CategoryRouter
