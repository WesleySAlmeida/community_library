// index.js
import express from "express";
import userRoutes from "./src/routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
