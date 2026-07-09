import express from "express"
import auth from "../middleware/auth.js";
import { addCart, clearCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", auth, getCart);
cartRouter.post("/add", auth, addCart);
cartRouter.put("/update", auth, updateQuantity);
cartRouter.delete("/remove", auth, removeFromCart);
cartRouter.delete("/clear", auth, clearCart);

export default cartRouter;