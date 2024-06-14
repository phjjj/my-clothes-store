import express from "express";
import { swaggerUi, swaggerDocs } from "./swagger/swaggerConfig.js";
import UserRouter from "./routes/UserRouter.js";

const app = express();
const PORT = 7777;

app.use(express.json());

// Swagger 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우터 설정
app.use("/api/users", UserRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
