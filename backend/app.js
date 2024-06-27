// app.js (또는 index.js)
import express from "express";
import { connectDB } from "./db/connectDB.js";
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import OrderRouter from "./routes/OrderRouter.js";
import CartRouter from "./routes/CartRouter.js";
import { postRefreshToken } from "./controllers/UserController.js";
import cors from "cors";
import CategoryRouter from "./routes/CategoryRouter.js";

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 이 부분을 추가해줘야 req.body에 접근 가능
// cors 설정
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// 라우터 설정
app.use("/users", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);
app.use("/cart", CartRouter);
app.use("/categories", CategoryRouter);

app.use("/refresh-token", postRefreshToken);

app.listen(PORT, () => {
  console.log(`🍿Server is running on port http://localhost:${PORT}`);
});
