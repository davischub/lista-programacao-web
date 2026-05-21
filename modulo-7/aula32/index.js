require("dotenv").config();
const express      = require("express");
const mongoose     = require("mongoose");
const cors         = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/produtos", require("./routes/produtoRoutes"));
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(function() {
    console.log("✅ MongoDB conectado");
    app.listen(process.env.PORT || 3000, function() {
      console.log("🚀 Servidor rodando em http://localhost:" + (process.env.PORT || 3000));
    });
  });