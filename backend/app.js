// app.js (또는 index.js)
import express from "express";
import { connectDB } from "./db/connectDB.js";
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import OrderRouter from "./routes/OrderRouter.js";
import CartRouter from "./routes/CartRouter.js";

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 이 부분을 추가해줘야 req.body에 접근 가능

connectDB();

// 라우터 설정
app.use("/user", UserRouter);
app.use("/products", ProductRouter);
app.use("/orders", OrderRouter);
app.use("/cart", CartRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🍿Server is running on port http://localhost:${PORT}`);
});
