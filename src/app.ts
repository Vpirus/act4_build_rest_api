import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./users/users.routes";
import { productRouter } from "./products/product.routes";

dotevnv.config();

const PORT = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
